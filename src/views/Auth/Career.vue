<template>
  <div>
    <div class="stepper_withlogo">
      <RegistrationHeader />
    </div>
    <div class="register_auth_wrapper">
      <div class="">
        <div class="">
          <div class="main-heading-wrap text-center">
            <h2 class="main-heading">{{ $t("career_step.title_heading") }}</h2>
          </div>
        </div>
        <div class="">
          <form action="">
            <div class="row">
              <CareerForm
                ref="moreCareer"
                @addNewCareer="isCareerFilled"
                :className="'col-lg-12'"
                :myCareer="staffCareerForm"
                :departments="departmentLists.slice().reverse()"
                :industries="industryLists"
                :seniority="seniorityLevels"
              />
              <!-- :authToken="staffData.auth_token" -->
            </div>
          </form>
          <div class="add_multiple_career">
            <CareerInformationModal
              :is="!wantAddMoreCareer"
              :departments="departmentLists.slice().reverse()"
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
                    {{ $t("career_step.add_career")
                    }}<img
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
              <span v-else> {{ $t("career_step.title_heading") }} </span>
            </button>
          </div>
          <div class="im-user flex justify-center">
            <span class="para14"> {{ $t("career_step.already_account") }}</span>
            <a @click="goTo" target="_blank" class="custom-link">{{
              $t("career_step.buttons.sign_in")
            }}</a>
            <!-- :to="{ name: 'signup-signin' }" -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import CareerInformationModal from "../../components/Shared/CareerInformationModal";
import SignupService from "../../Services/SignupService";
import errorhandler from "../../utils/Error";
import RegistrationHeader from "../../Layout/RegisterLayout/RegisterationHeader.vue";
// import Swal from "sweetalert2";

import {
  departmentModify,
  getDepartemntsValue,
} from "../../utils/DepartmentModify";
import CareerForm from "./CareerForm.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    CareerInformationModal,
    CareerForm,
    RegistrationHeader,
  },

  data() {
    return {
      value: null,
      openModal: false,
      wantAddMoreCareer: false,
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
      toastMessage: "",
      invitationId: "",
      careerArr: [],
      CareerList: [
        {
          company: "",
          position: "",
          industry: null,
          to: "",
          from: "",
          // workingAtPresent: true,
          division: "",
          seniority_level: null,
          department: [],
        },
      ],
      staffCareerForm: {},
    };
  },

  computed: {
    ...mapGetters({
      departmentLists: "allCareerDepartment",
      industryLists: "mainIndustries",
      seniorityLevels: "allSenoirityLevels",
    }),
  },

  created() {
    let activePage = this.$route.path.split("/")[1];
    console.log("career route", activePage);
    this.$store.dispatch("GET_ACTIVE_PAGE", activePage);
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
    }
    this.getdDepartmentList();
    this.getIndustryList();
    this.getSeniorityLevel();
  },

  // validations: {
  //   staffCareerForm: {},
  // },

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  methods: {
    goTo() {
      localStorage.removeItem("bWFpbCI6Inpvb");
      localStorage.removeItem("selected_company");
      // localStorage.removeItem("language");
      localStorage.removeItem("selected_year");
      sessionStorage.removeItem("OiJKV1QiLCJhbGciOiJIUzI1");
      this.$store.dispatch("GET_STAFF_DATA", null);
      this.$router.push({ name: "signup-signin" });
    },
    saveModalData(val) {
      console.log("modal career data", val.newCareer);
      if (val.newCareer.length > 0) {
        this.staffCareeArr2 = val.newCareer;
        this.$swal({
          icon: "success",
          title: "Information is Saved !",
          text: "",
        });
        // this.$refs.career_success.modal.show();
      }
    },

    modifyDepartment(data) {
      let deptsArr = departmentModify(data);
      return deptsArr.slice().reverse();
    },

    //save carreer details
    saveCarreerInfo() {
      // this.v$.$touch();
      this.$refs.moreCareer.validateForm();
      let newMerge;
      if (this.staffCareeArr1.length > 0 && this.staffCareeArr2.length > 0) {
        newMerge = [...this.staffCareeArr1, ...this.staffCareeArr2];
      } else {
        newMerge = this.staffCareeArr1;
      }
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
        this.isSubmitted = true;
        console.log("data career", data);
        SignupService.updateCareerInformation(data)
          .then((response) => {
            if (response.data.status) {
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
        if (sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") != null) {
          sessionStorage.setItem(
            "OiJKV1QiLCJhbGciOiJIUzI1",
            JSON.stringify(this.staffData)
          );
        } else {
          localStorage.setItem("bWFpbCI6Inpvb", JSON.stringify(this.staffData));
        }
      }

      this.v$.$reset();
      this.staffCareerForm = {};
      // console.log("kk1", this.invitedUserData);
      if (
        this.invitedUserData != null &&
        "invitation_id" in this.invitedUserData &&
        this.invitedUserData.invitation_id
      ) {
        // this.$router.push({ name: "link-company-account" });
        // this.$router.push({ name: "link-company-account" });
        this.$router.push({ name: "signin-verify-account" });
      } else {
        this.$router.push({ name: "signup-company" });
      }
    },

    // get Industry lists

    getIndustryList() {
      this.$store.dispatch("GET_MAIN_INDUSTRIES");
    },

    // get departmens lists
    getdDepartmentList() {
      this.$store.dispatch("GET_ALL_CAREER_DEPARTMENT");
    },

    isCareerFilled(value) {
      if (value && Object.keys(value).length != 0) {
        this.staffCareeArr1.push(value.newCareer);
        if (this.staffCareeArr1.length > 0) {
          this.openModal = true;
        }
      }
    },

    // get Seniority Levels
    getSeniorityLevel() {
      this.$store.dispatch("GET_ALL_SENOIRITY_LEVELS");
    },

    checkCareerSetup(data) {
      console.log("ik is career setup", data);
      SignupService.checkCareerInfo(data).then((res) => {
        if (res.data.status) {
          // No Company setup for Invited user
          if (this.invitedUser === false) {
            console.log("this is invited user", this.invitedUser);
            // new flow
            // this.$router.push({ name: "signup-company" });
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.btn_add_multiple {
  text-transform: capitalize;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  margin-bottom: 20px;
}
</style>
