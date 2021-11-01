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
                rules="required"
                :options="industryLists"
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
                :to="{ name: 'signup-register' }"
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
import signupService from "../../Services/SignupService";
import SignupService from "../../Services/SignupService";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      value: null,
      options: ["Batman", "Robin", "Joker"],
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      isSubmitted: false,
      errorType: Boolean,
      toastMessage: "",
      isNotification: false,
      industryLists: [],
      departmentLists: [],
      seniorityLevels: [],
      carreerForm: {
        auth_token: "",
        company: "",
        position: "",
        industry: null,
        seniority_level: null,
        department: [],
      },
    };
  },

  created() {
    if (
      localStorage.getItem("bWFpbCI6Inpvb") == undefined ||
      localStorage.getItem("bWFpbCI6Inpvb") == null ||
      localStorage.getItem("bWFpbCI6Inpvb") == ""
    ) {
      this.$router.push({ name: "signup-signin" });
    }

    this.checkCareerInformation();
    this.getIndustryList();
    this.getdDepartmentList();
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
      console.log(this.isNotification);
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        this.isSubmitted = true;

        console.log("career from Data", this.carreerForm);
        signupService
          .updateCareerInformation(this.carreerForm)
          .then((response) => {
            if (response.data.status) {
              this.errorType = true;
              this.isNotification = true;
              setTimeout(() => {
                this.isNotification = false;
              }, 4000);
              this.$toast.success(response.data.message, {
                position: "bottom-left",
                duration: 3712,
              });
              console.log(response);
              this.formReset();
            } else {
              Object.keys(response.data.error).map(function (key) {
                this.$toast.error(response.data.error[key], {
                  position: "bottom-left",
                  duration: 3712,
                });
              });
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.isSubmitted = false;
            this.isNotification = false;
          });
      }
    },
    formReset() {
      this.v$.$reset();
      this.carreerForm = {
        company: "",
        position: "",
        industry: null,
        seniority_level: null,
        department: [],
      };
      this.$router.push({ name: "signup-company" });
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
        } else {
          this.departmentLists = [
            { value: 0, label: "No record found", disabled: true },
          ];
        }
      });
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

    checkCareerInformation() {
      if (
        (this.staffData.auth_token != undefined ||
          this.staffData.auth_token != "",
        this.staffData.auth_token != null)
      ) {
        SignupService.checkCareerInformation({
          auth_token: this.staffData.auth_token,
        }).then((resp) => {
          if (resp.data.status) {
            this.$router.push({ name: "signup-company" });
          }
        });
      } else {
        this.$router.push({ name: "signup-signin" });
      }
    },
    // checkCarearInfo() {
    //   staffs/is_career_information_setup
    // }
  },
};
</script>

<style lang="scss" scoped>
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
