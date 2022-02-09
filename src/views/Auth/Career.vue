<template>
  <div>
    <div class="register_auth_wrapper">
      <div class="">
        <div class="">
          <div class="main-heading-wrap text-center">
            <h2 class="main-heading">Career Information</h2>
          </div>
        </div>
        <div class="form-wrapper">
          <form action="">
            <div class="row">
              <CareerForm
                ref="moreCareer"
                @addNewCareer="isCareerFilled"
                :className="'col-lg-12'"
                :myCareer="staffCareerForm"
                :departments="departmentLists"
                :industries="industryLists"
                :seniority="seniorityLevels"
              />
            </div>
          </form>
          <div class="add_multiple_career">
            <CareerInformationModal
              :departments="departmentLists"
              :seniority_level="seniorityLevels"
              :industry="industryLists"
              @multiCareer="saveModalData"
            >
              <template v-slot:add-button-action="{ addCareer }">
                <button
                  class="btn_add_multiple btn-transaprent btn-transaprent"
                  @click="addCareer"
                >
                  <span>
                    Add Carreer Information<img
                      src="K_Icons/info_gray_24dp.svg"
                      class="m-l-4"
                      alt=""
                  /></span>
                </button>
              </template>
            </CareerInformationModal>
          </div>
          <div class="d-grid space_btn">
            <button
              :disabled="isSubmitted"
              type="button"
              @click="saveCarreerInfo"
              class="btn k_btn_block btn-primary"
            >
              <div
                v-if="isSubmitted"
                class="spinner-border text-light"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <span v-else> Done </span>
            </button>
          </div>
          <div class="im-user flex justify-center">
            <span class="para14"> Already have an account?</span>
            <router-link
              target="_blank"
              class="custom-link"
              :to="{ name: 'signup-signin' }"
              >Sign In</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Multiselect from "@vueform/multiselect";
import CommonService from "../../Services/CommonService";
// import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import CareerInformationModal from "../../components/Shared/CareerInformationModal";
import SignupService from "../../Services/SignupService";
import errorhandler from "../../utils/Error";
import { getDepartemntsValue } from "../../utils/DepartmentModify";
// import { getIndustryModified } from "../../utils/commonHelperFuntions";
// import Datepicker from "vue3-date-time-picker";
import CareerForm from "./CareerForm.vue";

export default {
  components: {
    CareerInformationModal,
    CareerForm,
  },
  data() {
    return {
      value: null,
      openModal: false,
      staffCareeArr1: [],
      staffCareeArr2: [],
      careersList: [
        {
          company: "",
          industry: "",
          seniority_level: "",
          department: [],
          to: "",
          from: "",
        },
      ],
      departmentsArr: [],
      usersDepartmrnts: [],
      invitedUser: false,
      invitedUserData:
        JSON.parse(localStorage.getItem("bWFInpvitedbpbUser")) ||
        JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      staffData:
        JSON.parse(sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1")) ||
        JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      isSubmitted: false,
      errorType: Boolean,
      toastMessage: "",
      industryLists: [],
      departmentLists: [],
      seniorityLevels: [],
      invitationId: "",
      careerArr: [],
      CareerList: [
        {
          company: "",
          position: "",
          industry: null,
          to: "",
          from: "",
          seniority_level: null,
          department: [],
        },
      ],

      staffCareerForm: {},
    };
  },
  mounted() {
    console.log("staff career form career page ", this.staffCareerForm);
  },
  created() {
    if (
      sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") == undefined ||
      sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") == null ||
      sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") == ""
    ) {
      if (
        localStorage.getItem("bWFpbCI6Inpvb") == undefined ||
        localStorage.getItem("bWFpbCI6Inpvb") == null ||
        localStorage.getItem("bWFpbCI6Inpvb") == ""
      ) {
        this.$router.push({ name: "signup-signin" });
      }
    } else {
      console.log("eley");
    }
    if (
      this.invitedUserData &&
      Object.keys(this.invitedUserData).length != 0 &&
      this.invitedUserData.invitation_id
    ) {
      this.invitationId = +this.invitedUserData.invitation_id;
      this.invitedUser = true;
      let data = {
        invitation_id: this.invitationId,
      };
      this.getInvitationDetails(data);
      console.log("checking for invited User Data", data);
    } else {
      this.invitedUser = false;
      this.invitationId = "";
      console.log("checking for invited User Data", this.invitationId);
    }
    if (
      this.staffData &&
      Object.keys(this.staffData).length != 0 &&
      (this.staffData.auth_token != undefined ||
        this.staffData.auth_token != "" ||
        this.staffData.auth_token != null)
    ) {
      console.log(this.staffData);
      let data = {
        auth_token: this.staffData.auth_token,
        invitation_id: this.invitationId ? +this.invitationId : "",
      };
      console.log("checking for staff Data", data);
      this.checkCareerSetup(data);
    } else {
      console.log("vishal from checkCareerSetup at career.....");
      // this.$router.push({ name: "signup-signin" });
    }
    this.getdDepartmentList();
    this.getIndustryList();
    this.getSeniorityLevel();
  },

  validations: {
    staffCareerForm: {
      // company: { required },
      // position: { required },
      // industry: { required },
      // department: { required },
      // seniority_level: { required },
      // to: { required },
      // from: { required },
    },
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  methods: {
    saveModalData(val) {
      console.log("modal career data", val.newCareer);
      if (val.newCareer.length > 0) {
        this.staffCareeArr2 = val.newCareer;
      }
    },
    //save carreer details
    saveCarreerInfo() {
      this.v$.$touch();
      this.$refs.moreCareer.validateForm();
      let newMerge;
      if (this.staffCareeArr1.length > 0 && this.staffCareeArr2.length > 0) {
        newMerge = [...this.staffCareeArr1, ...this.staffCareeArr2];
        console.log("both array");
      } else {
        newMerge = this.staffCareeArr1;
        console.log("only First  array");
      }
      console.log("merged Arr", newMerge);
      let data = {
        auth_token: this.staffData.auth_token,
        invitation_id: this.invitationId ? this.invitationId : "",
        career_info: newMerge,
      };
      console.log("career is empty", data["career_info"].length > 0);
      if (
        data &&
        Object.keys(data).length !== 0 &&
        data["career_info"].length > 0
      ) {
        // return;
        // } else {
        console.log("career from Data after updatedkk", data);
        this.isSubmitted = true;
        SignupService.updateCareerInformation(data)
          .then((response) => {
            if (response.data.status) {
              this.errorType = true;
              console.log("career info", response.data.data.career_info);

              // this.$store.dispatch("getPersonalInfo", response.data.data); new flow //update personal information
              this.$toast.success(response.data.message, {
                position: "bottom-left",
                duration: 3712,
              });
              this.formReset();
            } else {
              errorhandler(response, this);
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
    getInvitationDetails(data) {
      SignupService.getInvitedCareerData(data).then((res) => {
        if (res.data.status) {
          this.staffCareerForm = {
            company: res.data.data.company.company_name,
            department: getDepartemntsValue(res.data.data.departments),
            industry: res.data.data.industry.id,
          };
          // this.staffCareerForm = {
          //   ...invitedDetails,
          // };
        } else {
          errorhandler(res, this);
        }
      });
    },
    formReset() {
      if (
        localStorage.getItem("bWFpbCI6Inpvb") != null ||
        sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") != null
      ) {
        this.staffData.is_career_information_setup = true;
        // localStorage.setItem("bWFpbCI6Inpvb", JSON.stringify(this.staffData));

        // this code add also run for save email on login
        if (sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") != null) {
          sessionStorage.setItem(
            "OiJKV1QiLCJhbGciOiJIUzI1",
            JSON.stringify(this.staffData)
          );
        }
      }
      // this.invitedUserData.hasOwnProperty("invitation_id")
      this.v$.$reset();
      this.staffCareerForm = {};
      console.log("kk1", this.invitedUserData);
      if (
        this.invitedUserData != null &&
        "invitation_id" in this.invitedUserData &&
        this.invitedUserData.invitation_id
      ) {
        this.$router.push({ name: "link-company-account" });
        // this.$router.push({ name: "Dashboard" });
        // localStorage.removeItem("bWFInpvitedbpbUser");
      } else {
        this.$router.push({ name: "signup-company" });
      }
    },
    // get Industry lists
    getIndustryList() {
      CommonService.getAllIndustries().then((resp) => {
        if (resp.data.status) {
          for (var i = 0; i < resp.data.data.length; i++) {
            let industry = {
              value: resp.data.data[i].id,
              label: resp.data.data[i].name,
            };
            this.industryLists.push(industry);
          }
        } else {
          this.industryLists = [
            { value: 0, label: "No record found", disabled: true },
          ];
        }
      });
    },

    // get departmens lists
    getdDepartmentList() {
      CommonService.getAllDepartments().then((resp) => {
        if (resp.data.status) {
          for (var i = 0; i < resp.data.data.length; i++) {
            let dept = {
              value: resp.data.data[i].departmentid,
              label: resp.data.data[i].name,
            };
            this.departmentLists.push(dept);
          }
          if (
            this.invitedUserData &&
            Object.keys(this.invitedUserData).length == 0
          ) {
            console.log("user in regular user");
          }
          // else {
          //   let givenDepartment = this.invitedUserData.departments;
          //   // this.isInvitedDepartments = true;
          //   console.log("invited department list", givenDepartment);
          //   // this.staffCareerForm.department = givenDepartment;
          // }
        } else {
          this.departmentLists = [
            { value: 0, label: "No record found", disabled: true },
          ];
        }
      });
    },
    isCareerFilled(value) {
      if (value && Object.keys(value).length != 0) {
        this.staffCareeArr1.push(value.newCareer);
        if (this.staffCareeArr1.length > 0) {
          this.openModal = true;
        }
        // this.careerArr.push(value.newCareer);
      }
    },
    // addMoreCareer() {
    //   console.log("kuldip", this.v$.$invalid);
    //   this.v$.$touch();
    //   this.$refs.moreCareer.validateForm();
    //   if (!this.v$.$invalid) {
    //     this.careersList.push({
    //       company: "",
    //       industry: "",
    //       seniority_level: "",
    //       department: [],
    //       from: "",
    //       to: "",
    //     });
    //   }
    // },
    // get Seniority Levels
    getSeniorityLevel() {
      CommonService.getAllSeniorityLevels().then((resp) => {
        if (resp.data.status) {
          for (var i = 0; i < resp.data.data.length; i++) {
            let seniorLevel = {
              value: resp.data.data[i].id,
              label: resp.data.data[i].level,
            };
            this.seniorityLevels.push(seniorLevel);
          }
        } else {
          this.seniorityLevels = [
            { value: 0, label: "No record found", disabled: true },
          ];
        }
      });
    },

    checkCareerSetup(data) {
      console.log("ik is career setup", data);
      // if (
      //   this.staffData != null &&
      //   (this.staffData.auth_token != undefined ||
      //     this.staffData.auth_token != "",
      //   this.staffData.auth_token != null)
      // ) {
      SignupService.checkCareerInfo(data).then((res) => {
        if (res.data.status) {
          // No Company setup for Invited user
          if (this.invitedUser === false) {
            console.log("this is invited user", this.invitedUser);
            // new flow
            this.$router.push({ name: "signup-company" });
          }
        }

        // if user not setup career information and go to Login Page

        // else {
        //   let resData = res.data;
        //   if (resData["data"] !== undefined) {
        //     let company_name = res.data.data.company;
        //     this.departmentsArr = res.data.data.department_list;
        //     this.departmentsArr.forEach((item) => {
        //       this.usersDepartmrnts.push(item["departmentid"]);
        //     });
        //     // (this.staffCareerForm = {
        //     //   company: company_name,
        //     //   department: this.usersDepartmrnts,
        //     // }),
        //     console.log(
        //       "Invited User from checkCareerSetup at career.....",
        //       company_name,
        //       this.usersDepartmrnts
        //     );
        //   }
        // }
      });
      // }
      // else {
      //   console.log("vishal from checkCareerSetup at career.....");
      //   this.$router.push({ name: "signup-signin" });
      // }
    },
    // checkCarearInfo() {
    //   staffs/is_career_information_setup
    // }
  },
};
</script>

<style lang="scss" scoped>
.btn_add_multiple {
  text-transform: capitalize;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
}
.date_label {
  position: absolute;
  padding: 8px;
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
  color: #8f9bb3;
}
.notification_wrpa {
  position: fixed;
  left: -100%;
  bottom: 5px;
  padding: 16px;
  width: auto;
  border-radius: 0 4px 4px 0;
  transition: 0.8s;
  background-color: #34994d;
  z-index: 9999;
  &.toastVisible {
    left: 0 !important;
  }
  &.success_toast {
    background-color: #d1e7dd;
    color: #18a33b;
  }
  &.error_toast {
    background-color: #f8d7da;
    color: #f14747;
  }
  .resp_message {
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    margin-bottom: 0;
  }
}
</style>
