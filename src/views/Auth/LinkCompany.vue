<template>
  <div class="container">
    <div class="register_auth_wrapper">
      <div class="form-wrapper">
        <div class="">
          <div class="main-heading-wrap text-center">
            <h2 class="main-heading p-b-30">Add a new company</h2>
          </div>
        </div>
        <div class="all_comp_wraper">
          <div
            class="compnay_tile"
            v-for="(company, indx) in usersCompanies"
            :key="indx"
          >
            <div class="d-inline-flex">
              <div class="com_logo_wrap">
                <img
                  :src="
                    company.company_logo
                      ? company.company_logo
                      : 'brandlogo.PNG'
                  "
                  class="com_logo"
                  alt=""
                />
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
                <!-- <p v-if="!company.invited" class="company_desc invited">
                  Invitation sent
                </p> -->
              </div>
            </div>
            <div v-if="company.invited" class="select_check">
              <BaseCheckbox
                :key="indx"
                @getCheckboxValue="acceptUserChoice"
                :checkval="company.invited"
              />
            </div>
          </div>
          <!-- <div class="compnay_tile">
            <div class="d-inline-flex">
              <div class="com_logo_wrap">
                <img src="brandlogo.PNG" class="com_logo" alt="" />
              </div>
              <div class="comp_basic_info">
                <h5 class="company_title">MTD</h5>
                <p class="company_desc invited">Invitation sent</p>
              </div>
            </div>
            <div  class="select_check">
              <BaseCheckbox />
            </div>
          </div> -->
        </div>
        <div class="">
          <!--  -->
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
</template>

<script>
import { mapGetters } from "vuex";
import BaseCheckbox from "../../components/Shared/BaseCheckbox.vue";
import CompanyService from "../../Services/Company/CompanyService";
import errorhandler from "../../utils/Error";
export default {
  data() {
    return {
      isSubmitted: false,
      invitedStaffInfo: JSON.parse(localStorage.getItem("bWFInpvitedbpbUser")),
      invitedId: undefined,
      usersCompanies: [],
      usersDepartmrnts: [],
      departmentsArr: [],
      invitaionStatus: true,
    };
  },
  components: {
    BaseCheckbox,
  },
  computed: {
    ...mapGetters({
      staffInfo: "staffData",
    }),
  },
  created() {
    console.log("invited user stored data", this.invitedStaffInfo);
    // if (this.invitedStaffInfo && Object.keys(this.invitedStaffInfo).length != 0) {
    //   this.invitedId = this.invitedStaffInfo.invitation_id;
    //   console.log("invited id ", this.invitedId);
    //   // if (this.invitedId != undefined) {
    //   //   this.invitaionAccepted();
    //   // }
    // }
    console.log("users email ", this.staffInfo);
    this.usersInvitedCompanies();
  },
  methods: {
    acceptUserChoice(value) {
      console.log("value date", value);
      this.invitaionStatus = value.checkedData;
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
        console.log("enter in invitaion acceptance");
        CompanyService.acceptInvitation(data).then((res) => {
          if (res.data.status) {
            console.log("invitainon response ", res.data);
            this.$router.push({ name: "signup-career" });
          } else {
            console.log("there is some error in in invitaion acceptance");
            // this.$router.push({ name: "signup-signin" });
            // next({ name: "signup-signin" });
          }
        });
      }

      // this.$router.push({ name: "signup-career" });
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
  .select_check {
    // margin-left: auto;
    // display: inline;
  }
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
