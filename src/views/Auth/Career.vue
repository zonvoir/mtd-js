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
          <form @submit.prevent="saveCarreerInfo" action="">
            <div class="k_form_group">
              <input
                type="text"
                class="form-control k_inp_field"
                placeholder="Company"
                @blur="v$.carreerForm.company.$touch"
                v-model.trim="carreerForm.company"
                :class="{
                  'is-invalid': v$.carreerForm.company.$error,
                }"
              />
              <div
                v-if="v$.carreerForm.company.$error"
                class="invalid-feedback text-left"
              >
                <span
                  v-if="v$.carreerForm.company.required.$invalid"
                  class="text-left fs-14"
                >
                  Company is required
                </span>
              </div>
            </div>

            <div class="k_form_group k_select_single">
              <Multiselect
                placeholder="Industry"
                class="form-control k_inp_field"
                :options="industryLists"
                rules="required"
                @blur="v$.carreerForm.industry.$touch"
                v-model="carreerForm.industry"
                :class="{
                  'is-invalid': v$.carreerForm.industry.$error,
                }"
              />
              <div
                v-if="v$.carreerForm.industry.$error"
                class="invalid-feedback text-left"
              >
                <span
                  v-if="v$.carreerForm.industry.required.$invalid"
                  class="text-left fs-14"
                >
                  Industry is required
                </span>
              </div>
            </div>

            <div class="k_form_group k_select_single">
              <!-- :disabled="isInvitedDepartments" -->
              <Multiselect
                placeholder="Department"
                mode="tags"
                :closeOnSelect="false"
                :searchable="true"
                :createTag="true"
                class="form-control k_inp_field"
                rules="required"
                :options="departmentLists"
                @blur="v$.carreerForm.department.$touch"
                v-model="carreerForm.department"
                :class="{
                  'is-invalid': v$.carreerForm.department.$error,
                }"
              />
              <div
                v-if="v$.carreerForm.department.$error"
                class="invalid-feedback text-left"
              >
                <span
                  v-if="v$.carreerForm.department.required.$invalid"
                  class="text-left fs-14"
                >
                  Department is required
                </span>
              </div>
            </div>
            <div class="k_form_group">
              <input
                type="text"
                class="form-control k_inp_field"
                placeholder="Position"
                @blur="v$.carreerForm.position.$touch"
                v-model.trim="carreerForm.position"
                :class="{
                  'is-invalid': v$.carreerForm.position.$error,
                }"
              />
              <div
                v-if="v$.carreerForm.position.$error"
                class="invalid-feedback text-left"
              >
                <span
                  v-if="v$.carreerForm.position.required.$invalid"
                  class="text-left fs-14"
                >
                  Position is required
                </span>
              </div>
            </div>
            <div class="k_form_group k_select_single">
              <Multiselect
                placeholder="Seniority Level"
                class="form-control k_inp_field"
                rules="required"
                :options="seniorityLevels"
                @blur="v$.carreerForm.seniority_level.$touch"
                v-model="carreerForm.seniority_level"
                :class="{
                  'is-invalid': v$.carreerForm.seniority_level.$error,
                }"
              />
              <div
                v-if="v$.carreerForm.seniority_level.$error"
                class="invalid-feedback text-left"
              >
                <span
                  v-if="v$.carreerForm.seniority_level.required.$invalid"
                  class="text-left fs-14"
                >
                  Seniority level is required
                </span>
              </div>
            </div>
            <div class="k_form_group row">
              <div class="col-lg-6">
                <div class="k_form_group position-relative">
                  <label for="" class="date_label">{{
                    $t("projects.project_form.placeholder.from")
                  }}</label>
                  <Datepicker
                    class="project_date_picker custom_label"
                    v-model="date"
                    placeholder="dd/mm/yyyy"
                  ></Datepicker>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="k_form_group position-relative">
                  <label for="" class="date_label">{{
                    $t("projects.project_form.placeholder.to")
                  }}</label>
                  <Datepicker
                    class="project_date_picker custom_label"
                    placeholder="dd/mm/yyyy"
                  ></Datepicker>
                </div>
              </div>
            </div>
            <div v-if="isHidden" class="add_multiple_career">
              <CareerInformationModal>
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
                <template v-slot:more-careers>
                  <!--  -->
                  <div
                    class="row"
                    v-for="(career, idx) in careersList"
                    :key="idx"
                  >
                    <CareerForm
                      ref="childCareer"
                      @addNewCareer="isCareerFilled"
                      :className="'col-lg-6'"
                      :myCareer="career"
                      :departments="departmentLists"
                      :industries="industryLists"
                      :seniority="seniorityLevels"
                    />
                  </div>
                </template>
              </CareerInformationModal>
            </div>
            <div class="d-grid space_btn">
              <button
                :disabled="isSubmitted"
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
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import CommonService from "../../Services/CommonService";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import CareerInformationModal from "../../components/Shared/CareerInformationModal";
import SignupService from "../../Services/SignupService";
import errorhandler from "../../utils/Error";
import Datepicker from "vue3-date-time-picker";
import CareerForm from "./CareerForm.vue";

export default {
  components: {
    Multiselect,
    CareerInformationModal,
    Datepicker,
    CareerForm,
  },
  data() {
    return {
      value: null,
      from: "From",
      to: "To",
      isHidden: false,
      careersList: [
        {
          company: "",
          industry: "",
          seniority_level: "",
          department: "",
          to: "",
          from: "",
        },
      ],
      // date: new Date(),
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
      carreerForm: {
        auth_token: "",
        company: "",
        position: "",
        invitation_id: undefined,
        industry: null,
        seniority_level: null,
        department: [],
      },
    };
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
      this.invitedUser = true;
      this.invitationId = this.invitedUserData.invitation_id;
      console.log(
        "checking for invited User Data",
        this.carreerForm.invitation_id
      );
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
      console.log("checking for staff Data");
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
    carreerForm: {
      company: { required },
      position: { required },
      industry: { required },
      department: { required },
      seniority_level: { required },
    },
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  methods: {
    //save carreer details
    saveCarreerInfo() {
      this.carreerForm.auth_token = this.staffData.auth_token;
      this.carreerForm.invitation_id = this.invitationId
        ? +this.invitationId
        : "";
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        console.log("career from Data after updatedkk", this.carreerForm);
        this.isSubmitted = true;
        this.isHidden = true;
        SignupService.updateCareerInformation(this.carreerForm)
          .then((response) => {
            if (response.data.status) {
              this.errorType = true;
              console.log("dispatch kk career info", response.data.data);
              this.$store.dispatch("getPersonalInfo", response.data.data); //update personal information
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
    formReset() {
      if (localStorage.getItem("bWFpbCI6Inpvb") != null) {
        this.staffData.is_career_information_setup = true;
        console.log("this is invited user  enter reset");
        localStorage.setItem("bWFpbCI6Inpvb", JSON.stringify(this.staffData));
      }

      this.v$.$reset();
      this.carreerForm = {
        company: "",
        position: "",
        industry: null,
        invitation_id: null,
        seniority_level: null,
        department: [],
      };
      if (this.invitedUserData.invitation_id) {
        console.log("this is invited user after form reset");
        localStorage.removeItem("bWFInpvitedbpbUser"); //remove invited user Data
        this.$router.push({ name: "Dashboard" });
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
          // invitedStaffData && Object.keys(invitedStaffData).length != 0 this.invitedUserData === null
          if (
            this.invitedUserData &&
            Object.keys(this.invitedUserData).length == 0
          ) {
            console.log("user in regular user");
          } else {
            let givenDepartment = this.invitedUserData.departments;
            // this.isInvitedDepartments = true;
            console.log("invited department list", givenDepartment);
            // this.carreerForm.department = givenDepartment;
          }
        } else {
          this.departmentLists = [
            { value: 0, label: "No record found", disabled: true },
          ];
        }
      });
    },
    isCareerFilled(value) {
      if (value && Object.keys(value).length != 0) {
        console.log("console kkuldip", value);
      }
    },
    addMoreCareer() {
      this.addCareer = true;
      console.log("kuldip", this.v$.$invalid);
      this.v$.$touch();
      if (!this.v$.$invalid) {
        this.$refs.childCareer.validateForm();
        this.careersList.push({
          company: "",
          industry: "",
          seniority_level: "",
          department: "",
          from: "",
          to: "",
        });
      }
    },
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
      console.log(data);
      // if (
      //   this.staffData != null &&
      //   (this.staffData.auth_token != undefined ||
      //     this.staffData.auth_token != "",
      //   this.staffData.auth_token != null)
      // ) {
      SignupService.checkCareerInfo(data).then((res) => {
        if (res.data.status) {
          console.log(
            "Kuldip from checkCareerSetup at career.....",
            res.data.data
          );
          // No Company setup for Invited user
          this.$router.push({ name: "signup-company" });
        } else {
          let resData = res.data;
          if (resData["data"] !== undefined) {
            let company_name = res.data.data.company;
            this.departmentsArr = res.data.data.department_list;
            this.departmentsArr.forEach((item) => {
              this.usersDepartmrnts.push(item["departmentid"]);
            });
            (this.carreerForm = {
              company: company_name,
              department: this.usersDepartmrnts,
            }),
              console.log(
                "Invited User from checkCareerSetup at career.....",
                company_name,
                this.usersDepartmrnts
              );
          }
        }
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
