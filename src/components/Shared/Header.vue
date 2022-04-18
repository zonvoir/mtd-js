<template>
  <div class="header-wrappper">
    <div class="left-header">
      <div class="comp_select">
        <Dropdown
          v-model="myCurrentCompany"
          :options="companyListArr"
          optionLabel="label"
          class="company_select_header"
          placeholder="Select a company"
          @change="changeCompany"
        >
          <template #value="slotProps">
            <div class="company-item company-item-value" v-if="slotProps.value">
              <img
                v-if="slotProps.value.icon"
                class="img_logo"
                :src="slotProps.value.icon"
              />
              <span v-else class="default_logo m-r-10">
                <b>{{ getFirstCharacter(slotProps.value.label) }}</b>
              </span>
              <span class="company_item_name">{{ slotProps.value.label }}</span>
            </div>
          </template>
          <template #option="slotProps">
            <div class="company-item">
              <img
                v-if="slotProps.option.icon"
                class="img_logo"
                :src="slotProps.option.icon"
              />
              <span v-else class="default_logo m-r-10">
                <b>{{ getFirstCharacter(slotProps.option.label) }}</b>
              </span>
              <span class="company_item_name">{{
                slotProps.option.label
              }}</span>
            </div>
          </template>
        </Dropdown>
      </div>
      <!-- select year- -->
      <div class="comp_year_select">
        <Dropdown
          class="header_year"
          optionLabel="label"
          optionValue="value"
          :placeholder="$t('header.placeholder.select_year')"
          :options="modifyYear(yearOptions)"
          @change="changeYear"
          rules="required"
          v-model="currentYear"
        />
      </div>
    </div>
    <div class="right-header">
      <!-- profile section -->
      <div class="profile-pic-conatiner">
        <a
          @click.prevent="toggleDropdown"
          aria-haspopup="true"
          aria-controls="prime_profile_dropdown"
          class="user_acc"
        >
          <img
            v-if="
              getProfileData.profile_image == '' || getProfileData.profile == ''
            "
            src="default-user.png"
            class="profile-pic"
          />
          <img
            v-else
            :src="
              getProfileData.profile_image
                ? getProfileData.profile_image
                : getProfileData.profile
            "
            class="profile-pic"
          />
        </a>
      </div>
    </div>
    <div class="drop_menu_wrap" :class="{ shown: state }">
      <ul class="drop_down_menu" v-show="state">
        <li>
          <a
            :class="{ active_drop_item: isprofile }"
            @click="personalProfile"
            class="drop_dowm_link"
            >{{ $t("header.profile_drop_down.profile") }}
          </a>
        </li>
        <li>
          <a @click="onLogout" class="drop_dowm_link">
            {{ $t("header.profile_drop_down.logout") }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import companyService from "../../Services/Company/CompanyService";
import { mapGetters } from "vuex";
import errorhandler from "../../utils/Error";
import { getFirstLetter } from "../../utils/commonHelperFuntions";
import Dropdown from "primevue/dropdown";
export default {
  name: "Header",

  components: {
    Dropdown,
  },
  data() {
    return {
      state: false,
      userpic: "",
      currentYear: localStorage.getItem("selected_year")
        ? localStorage.getItem("selected_year")
        : +new Date().getFullYear(),
      yearOptions: [],
      isprofile: false,
      companyListArr: undefined,
      companies: [],
      staffInfo: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),

      items: [
        {
          label: "Delete",
          icon: "pi pi-trash",
        },
      ],
      myCurrentCompany: {
        value: "0",
        label: "",
        icon: "",
      },
      // placeholder: "header.placeholder.select_your_company",
    };
  },
  computed: {
    ...mapGetters({
      companyLists: "staffsCompanies",
      getProfileData: "personalInfo",
      getMembers: "companyMembers",
      ownRole: "roleInCompany",
      currentCompany: "activeCompany",
    }),
  },
  watch: {
    currentCompany: {
      handler(val) {
        this.myCurrentCompany = this.getCurrentActiveCompany(val);
        this.getAllMemberList(this.myCurrentCompany.value);
      },
      deep: true,
    },
    companyLists: function (val) {
      this.companyListArr = val.map((item) => {
        return {
          value: item.company_id,
          label: item.company,
          icon: item.company_logo,
        };
      });
    },
  },
  mounted() {
    if (this.$route.path === "/personal-account") {
      this.isprofile = true;
    } else {
      this.isprofile = false;
    }
    document.addEventListener("click", this.close);
  },
  created() {
    this.changeYear();
    if (
      this.staffInfo != null &&
      this.staffInfo != undefined &&
      this.staffInfo != ""
    ) {
      this.getAllCompanies();
      this.getStaffDetails();
    }
  },

  methods: {
    modifyYear(years) {
      let data = years.map((val) => {
        return {
          value: val,
          label: val,
        };
      });
      return data;
    },
    getStaffDetails() {
      this.$store.dispatch("getPersonalInfo", {
        auth_token: this.staffInfo.auth_token,
      });
    },
    getFirstCharacter(str) {
      return getFirstLetter(str);
    },
    getAllCompanies() {
      this.$store
        .dispatch("getStaffsCompanies", {
          auth_token: this.staffInfo.auth_token,
        })
        .then((res) => {
          if (res.data.status) {
            let defCompany = 0;
            this.companies = res.data.data;
            this.companyListArr = this.companies.map((item, indx, itemsArr) => {
              if (item.created_by_me == "1") {
                defCompany = item.company_id;
              } else if (itemsArr.length - 1 === indx) {
                defCompany = item.company_id;
              }
              return {
                value: item.company_id,
                label: item.company,
                icon: item.company_logo,
              };
            });

            localStorage.getItem("selected_company")
              ? (this.myCurrentCompany = this.getCurrentActiveCompany(
                  localStorage.getItem("selected_company")
                ))
              : (this.myCurrentCompany =
                  this.getCurrentActiveCompany(defCompany));
            this.changeCompany();
          } else {
            errorhandler(res);
          }
        });
    },
    changeCompany() {
      localStorage.setItem("selected_company", this.myCurrentCompany.value);
      this.$store.dispatch("getActiveCompany", this.myCurrentCompany.value);
      this.$router.push({ name: "Dashboard" });
      this.getAllMemberList(this.myCurrentCompany.value);
    },

    getCurrentActiveCompany(value) {
      return this.companyListArr.find((x) => x.value == value);
    },

    getAllMemberList(companyId) {
      let memberArr = [];
      let deprtmentArr;
      let roleId;
      this.tempCompnies = this.companyLists;
      this.tempCompnies.forEach((item) => {
        if (item.company_id == companyId) {
          memberArr = item.member;
          console.log("item", item);
          roleId = {
            roleId: item.company_role_id,
            can_invite: item.can_invite,
            view_company_detail: item.view_company_detail,
          };
          // departments that realted to staff in a perticular company

          item.member.forEach((memItem) => {
            if (roleId.roleId == memItem.role_id) {
              deprtmentArr = memItem.departments;
            }
          });
        }
      });
      // set the  members List
      this.$store.dispatch("getCompanyMembers", memberArr);
      // set the role id in company
      this.$store.dispatch("getRoleInCompany", roleId);
      // staff departments
      this.$store.dispatch("GET_STAFFS_DEPARTMENT", deprtmentArr);
    },
    changeYear() {
      companyService.getYears().then((res) => {
        if (res.data.status) {
          this.yearOptions = res.data.data;
        } else {
          errorhandler(res, this);
        }
      });
      localStorage.setItem("selected_year", this.currentYear);
      localStorage.getItem("selected_year")
        ? (this.currentYear = localStorage.getItem("selected_year"))
        : (this.currentYear = +new Date().getFullYear());
      this.$store.dispatch("getYear", this.currentYear);
      this.$router.push({ name: "Dashboard" });
    },

    personalProfile() {
      this.isprofile = true;
      this.$router.push({ name: "personal-account" });
      this.currentPage = this.$route.path;
      console.log("profile Page", this.currentPage);
    },
    onLogout() {
      localStorage.removeItem("bWFpbCI6Inpvb");
      localStorage.removeItem("selected_company");
      localStorage.removeItem("language");
      localStorage.removeItem("selected_year");
      this.$store.dispatch("GET_STAFF_DATA", null);
      this.$router.push({ name: "signup-signin" });
    },
    toggleDropdown() {
      this.state = !this.state;
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.state = false;
      }
    },
  },

  beforeUnmount() {
    document.removeEventListener("click", this.close);
  },
};
</script>

<style lang="scss" scoped>
.user_acc {
  cursor: pointer;
}
.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.shown {
  position: absolute;
  top: 66px !important;
  right: 2px;
  z-index: 99;
}
.drop_down_menu {
  background: #ffffff;
  box-shadow: 10px 0px 25px rgba(178, 187, 211, 0.2);
  border-radius: 0px 0px 4px 4px;
  margin: 0;
  padding-left: 0;
  padding: 10px;
}
li {
  background-color: #ffffff;
  padding: 15px 10px;
  border-radius: 4px;
  list-style: none;
  width: 120px;
  text-align: center;
  .drop_dowm_link {
    text-decoration: none;
    color: #8f9bb3;
    cursor: pointer;
  }
  .active_drop_item {
    color: #7900d8 !important;
  }
}

.left-header {
}
.right-header {
  margin-left: auto;
}
.header-wrappper {
  padding: 12px 20px;
  box-shadow: 0px 2px 25px rgba(178, 187, 211, 0.12);
  display: flex;
  align-items: center;
}
.default_logo {
  // justify-content: center;
  // align-content: center;
  // display: inline-flex;
  // font-weight: bold;
  // font-size: 18px;
  padding-top: 4px;
  line-height: 1.7rem;
  width: 1.7rem;
  height: 1.7rem;
  background-color: #42aaff;
  border-radius: 4px;
  text-align: center;
  line-height: 0;
  display: inline-block;
  b {
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;
  }
  .p-dropdown-item {
    .company-item {
      display: flex;
      align-items: center;
      .img_logo {
        width: 36px !important;
      }
      .company_item_name {
        margin-left: 5px;
        display: inline-block !important;
        width: 180px !important;
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
