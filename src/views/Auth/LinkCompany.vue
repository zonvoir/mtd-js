<template>
  <div class="">
    <div class="custom_brand_logo">
      <MainLogo />
    </div>
    <div class="container">
      <div class="register_auth_wrapper">
        <div class="">
          <div class="">
            <div class="main-heading-wrap text-center">
              <h2 class="main-heading p-b-30">Add a new company</h2>
            </div>
          </div>
          <div class="all_comp_wraper scroll_list">
            <div
              class="compnay_tile"
              v-for="(company, indx) in usersCompanies.slice().reverse()"
              :key="indx"
            >
              <div class="d-inline-flex">
                <div class="com_logo_wrap">
                  <img
                    v-if="company.company_logo"
                    :src="
                      company.company_logo
                        ? company.company_logo
                        : 'brandlogo.PNG'
                    "
                    class="com_logo"
                    alt=""
                  />
                  <span v-else class="default_logo default_member_logo">
                    <b> {{ formatMemberName(company.company) }}</b>
                  </span>
                </div>
                <div class="comp_basic_info">
                  <h5 class="company_title">{{ company.company }}</h5>
                  <p class="company_desc">
                    <span v-if="company.invited" class="company_desc invited"
                      >Invited as
                      <span class="m-r-2"
                        >{{ company.company_role_name }}
                      </span></span
                    >
                    <span v-else>
                      Already a member in

                      <template
                        v-for="(department, i) in company.department_list"
                        :key="department.departmentid"
                      >
                        <span
                          >{{ department.name }}
                          <span v-if="i != company.department_list.length - 1"
                            >,</span
                          ></span
                        >
                      </template>
                      Departament
                    </span>
                  </p>
                </div>
              </div>
              <div v-if="company.invited" class="select_check">
                <BaseCheckbox
                  :key="indx"
                  :checkval="company.invited"
                  @getCheckboxValue="acceptUserChoice"
                />
              </div>
            </div>
          </div>
          <div class="">
            <div class="d-grid space_btn3">
              <button
                :disabled="!invitaionStatus || isSubmitted"
                @click="companySelected"
                type="submit"
                class="btn k_btn_block btn-primary"
              >
                <div
                  v-if="isSubmitted"
                  class="spinner-border text-light"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                <span v-else> Continue </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCheckbox from "../../components/Shared/BaseCheckbox.vue";
import CompanyService from "../../Services/Company/CompanyService";
import { getFirstLetter } from "../../utils/commonHelperFuntions";
import MainLogo from "../../components/Shared/MainLogo.vue";

import errorhandler from "../../utils/Error";
export default {
  data() {
    return {
      isSubmitted: false,
      invitedStaffInfo: JSON.parse(localStorage.getItem("bWFInpvitedbpbUser")),
      staffInfo:
        JSON.parse(sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1")) ||
        JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      invitedId: undefined,
      usersCompanies: [],
      usersDepartmrnts: [],
      departmentsArr: [],
      invitaionStatus: true,
    };
  },

  components: {
    BaseCheckbox,
    MainLogo,
  },
  created() {
    this.usersInvitedCompanies();
  },
  methods: {
    acceptUserChoice(value) {
      console.log("value date", value);
      this.invitaionStatus = value.checkedData;
    },
    formatMemberName(str) {
      return getFirstLetter(str);
    },
    companySelected() {
      this.isSubmitted = true;
      if (
        this.invitedStaffInfo &&
        Object.keys(this.invitedStaffInfo).length != 0 &&
        this.staffInfo &&
        Object.keys(this.staffInfo).length != 0
      ) {
        this.invitedId = this.invitedStaffInfo.invitation_id;
        let data = {
          auth_token: this.staffInfo.auth_token,
          invitation_id: +this.invitedStaffInfo.invitation_id,
        };

        CompanyService.acceptInvitation(data)
          .then((res) => {
            if (res.data.status) {
              this.$toast.success(res.data.message, {
                position: "bottom-left",
                duration: 3712,
              });
              sessionStorage.removeItem("OiJKV1QiLCJhbGciOiJIUzI1");
              localStorage.removeItem("bWFInpvitedbpbUser");

              this.$router.push({ name: "Dashboard" });
            } else {
              errorhandler(res, this);
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.isSubmitted = false;
          });
      }
    },

    usersInvitedCompanies() {
      CompanyService.usersAllCompanies({
        email: this.invitedStaffInfo.email,
        invitation_id: +this.invitedStaffInfo.invitation_id,
      })
        .then((res) => {
          if (res.data.status) {
            this.usersCompanies = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              let element = res.data.data[i];
              this.departmentsArr = element.department_list;
              this.departmentsArr.forEach((item) => {
                this.usersDepartmrnts.push(item["name"]);
              });
            }
          } else {
            errorhandler(res, this);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isSubmitted = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll_list {
  max-height: 12rem;
  overflow: auto;
  padding-right: 6px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  // / Track /
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #f7f9fc;
    border-radius: 0px;
  }
  // / Handle /
  &::-webkit-scrollbar-thumb {
    background-color: #aab4c5bd !important;
    border-radius: 10px;
  }
}
.default_logo {
  justify-content: center;
  align-content: center;
  display: inline-flex;
  line-height: 2.5rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #42aaff;
  border-radius: 4px;
  b {
    font-weight: bold;
    font-size: 16px;
    line-height: 2.4rem;
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;
  }
}
.space_btn3 {
  margin-top: 287px;
  margin-bottom: 30px;
}
.compnay_tile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #e4e9f2;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  padding: 15px 25px 15px 17px;
  margin-bottom: 20px;

  .com_logo {
    width: 40px;
    height: 40px;
  }
  .com_logo_wrap {
    border-radius: 4px;
  }
  .comp_basic_info {
    margin-left: 15px;
    .company_title {
      font-weight: bold;
      text-align: left;
      font-size: 18px;
      line-height: 24px;
      color: #222b45;
      margin-bottom: 0;
    }

    .company_desc {
      font-style: italic;
      margin-bottom: 0;
      font-weight: 500;
      font-size: 10px;
      line-height: 24px;
      color: #8f9bb3;
      &.invited {
        color: rgba(121, 0, 216, 0.5) !important;
      }
    }
  }
}
</style>
