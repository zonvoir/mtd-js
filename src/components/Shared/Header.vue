<template>
  <div class="header-wrappper">
    <div class="left-header">
      <div class="comp_select">
        <Multiselect
          v-model="example8.value"
          v-bind="example8"
          @select="changeCompany"
          class="header_select"
        >
          <template v-slot:singlelabel="{ value }">
            <div class="multiselect-single-label">
              <img
                class="character-label-icon"
                :src="value.icon ? value.icon : 'K_Icons/company_no_logo.svg'"
              />
              {{ value.name }}
            </div>
          </template>

          <template v-slot:option="{ option }">
            <img
              class="character-option-icon"
              :src="option.icon ? option.icon : 'K_Icons/company_no_logo.svg'"
            />
            {{ option.name }}
          </template>
        </Multiselect>
      </div>
      <!-- select year- -->
      <div class="comp_year_select">
        <Multiselect
          v-model="currentYear"
          :placeholder="$t('header.placeholder.select_year')"
          class="header_select"
          @select="changeYear"
          :options="yearOptions"
        />
      </div>
      <!-- {{ currentYear }}
      {{ yearOptions }} -->
    </div>
    <div class="right-header">
      <!-- profile section -->
      <div class="profile-pic-conatiner">
        <a @click.prevent="toggleDropdown" class="user_acc">
          <img
            :src="
              getProfileData.profile_image
                ? getProfileData.profile_image
                : getProfileData.profile
            "
            class="profile-pic"
          />
          <!-- <img src="../../assets/users/100_3.jpg" class="profile-pic" /> -->
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
import Multiselect from "@vueform/multiselect";
import signupService from "../../Services/SignupService";
import userLogo from "../../assets/users/100_3.jpg";
import companyService from "../../Services/Company/CompanyService";
import { mapGetters } from "vuex";
import errorhandler from "../../utils/Error";
export default {
  name: "Header",
  components: {
    Multiselect,
  },
  data() {
    return {
      state: false,
      userLogo,
      userpic: "",
      currentYear: "" + new Date().getFullYear(),
      yearOptions: [],
      isprofile: false,
      companies: [],
      staffInfo: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      // selectedCompany: "66",
      example8: {
        value: "0",
        placeholder: "header.placeholder.select_your_company",
        label: "name",
        options: [],
      },
    };
  },
  computed: {
    ...mapGetters({
      // staffInfo: "staffData",
      getProfileData: "personalInfo",
      getMembers: "companyMembers",
      companyLists: "staffsCompanies",
      ownRole: "roleInCompany",
      currentCompany: "activeCompany",
    }),
  },
  watch: {
    currentCompany: {
      handler(val) {
        console.log(val);
        this.example8.value = val;
        this.getAllMemberList(this.example8.value);
      },
      deep: true,
    },

    // staffInfo: {
    //   handler(val) {
    //     console.log(val, "v");
    //     this.getAllCompanies();
    //     this.getStaffDetails();
    //   },
    // },
  },
  created() {
    console.log("dsjksd", this.staffInfo);

    this.changeYear();
    // this.currentYear = "" + new Date().getFullYear();
    if (
      this.staffInfo != null &&
      this.staffInfo != undefined &&
      this.staffInfo != ""
    ) {
      this.getAllCompanies();
      this.getStaffDetails();
    }
    // console.log("current Year", this.currentYear);
  },
  methods: {
    getStaffDetails() {
      signupService
        .getPersonalDetails({ auth_token: this.staffInfo.auth_token })
        .then((res) => {
          if (res.data.status) {
            this.$store.dispatch("getPersonalInfo", res.data.data);
          } else {
            errorhandler(res, this);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllCompanies() {
      console.log(this.staffInfo.auth_token);
      companyService
        .companiesList({ auth_token: this.staffInfo.auth_token })
        .then((res) => {
          if (res.data.status) {
            this.$store.dispatch("getStaffsCompanies", res.data.data);
            let defCompany = 0;
            for (const company of res.data.data) {
              let d1 = {
                value: company.company_id,
                name: company.company,
                icon: company.company_logo,
              };
              if (company.is_main == "1") {
                defCompany = company.company_id;
              }
              this.example8.options.push(d1);
              this.companies.push(d1);
            }
            this.example8.value = +defCompany;
            this.changeCompany();
          } else {
            errorhandler(res, this);
          }
        });
    },
    changeCompany() {
      localStorage.setItem("selected_company", this.example8.value);
      this.$store.dispatch("getActiveCompany", this.example8.value);
      // this.$router.push({ name: "Dashboard" });
      this.getAllMemberList(this.example8.value);
    },
    getAllMemberList(companyId) {
      let memberArr = [];
      let deprtmentArr = [];
      let roleId;
      this.tempCompnies = this.companyLists;
      this.tempCompnies.forEach((item) => {
        if (item.company_id == companyId) {
          memberArr = item.member;
          roleId = item.company_role_id;
          // departments that realted to staff in a perticular company
          item.member.forEach((memItem) => {
            if (roleId == memItem.role_id) {
              deprtmentArr = memItem.departments;
            }
          });
        }
      });
      // set the  members List
      this.$store.dispatch("getCompanyMembers", memberArr);
      // set the role id in company
      this.$store.dispatch("getRoleInCompany", roleId);
      // modify Accroding to multi select
      let departmentAssignedToStaff = [];
      deprtmentArr.forEach((item) => {
        let dept = {
          value: item.departmentid,
          label: item.name,
        };
        departmentAssignedToStaff.push(dept);
      });
      // this.$store.dispatch("getStaffsDepartment", departmentAssignedToStaff);
      this.$store.dispatch("GET_STAFFS_DEPARTMENT", departmentAssignedToStaff);
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
      this.$store.dispatch("getYear", this.currentYear);
      // this.$router.push({ name: "Dashboard" });
    },

    personalProfile() {
      this.isprofile = true;
      this.$router.push({ name: "personal-account" });
      this.currentPage = this.$route.path;
      console.log("profile Page", this.currentPage);
    },
    onLogout() {
      localStorage.removeItem("bWFpbCI6Inpvb");
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
  mounted() {
    // if (
    //   this.staffInfo != null &&
    //   this.staffInfo != undefined &&
    //   this.staffInfo != ""
    // ) {
    //   this.getAllCompanies();
    //   this.getStaffDetails();
    // }

    if (this.$route.path === "/personal-account") {
      this.isprofile = true;
    } else {
      this.isprofile = false;
    }
    document.addEventListener("click", this.close);
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
</style>
