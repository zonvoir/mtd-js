<template>
  <div>
    <div class="company_modal_wrap">
      <slot name="add-company"> </slot>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      ref="create_company_modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content company_modal_content">
          <div class="modal-header company_modal_header">
            <div class="company_header_wrapper">
              <div class="stepper_container">
                <Stepper :currentStep="activeStep" />
              </div>
              <div class="process_title_wrap">
                <h2 class="process_title">
                  {{ $t("company.profile_main_title") }}
                </h2>
              </div>
            </div>
            <div class="close_btn_wrap">
              <button
                type="button"
                @click="closeModal"
                class="btn btn-transaprent zp-0 m-l-auto"
              >
                <img src="K_Icons/cancel.svg" alt="" class="close_icon" />
              </button>
            </div>
          </div>
          <div class="modal-body company_modal_body">
            <div class="company_forms_container">
              <div v-show="activeStep === 1" class="">
                <CompanyStep1
                  ref="create_company_modal_step_first"
                  :creatingMode="'profile'"
                />
              </div>
              <div v-show="activeStep === 2" class="">
                <!-- I am from step 2 -->
                <CompanyStep2
                  ref="create_company_modal_step_second"
                  :creatingMode="'profile'"
                  :countryId="countryData"
                />
              </div>
            </div>
          </div>
          <div class="modal_action_btn text-right">
            <button
              v-if="activeStep === 1"
              type="button"
              @click="nextStep"
              class="btn default_padding btn-light btn-set"
            >
              <!-- Save & Next -->
              {{ $t("company.profile_buttons.Save_next") }}
            </button>
            <div v-else class="">
              <button
                type="button"
                @click="previousStep"
                class="btn default_padding btn-light btn-set m-r-8"
              >
                {{ $t("company.profile_buttons.back") }}
              </button>
              <button
                type="button"
                @click="addNewCompany"
                class="btn default_padding btn-primary btn-set"
              >
                {{ $t("company.profile_buttons.Create") }}
              </button>
            </div>
            <!-- <button
              type="button"
              @click="onCloseModal"
              class="btn default_padding k_btnfs14_w700 btn-primary"
            >
              Ok
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import Stepper from "../../../components/Shared/Stepper.vue";
import CompanyStep1 from "../../Auth/Components/CompanyStep1.vue";
import CompanyStep2 from "../../Auth/Components/CompanyStep2.vue";
import SignupService from "../../../Services/SignupService";
import errorhandler from "../../../utils/Error";
export default {
  // emits: ["agreeToComplete"],
  components: {
    Stepper,
    CompanyStep1,
    CompanyStep2,
  },
  data() {
    return {
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      modal: null,
      countryData: "",
      activeStep: 1,
      allCompanyData: undefined,
      basicCompanyData: undefined,
      advCompanyData: undefined,
    };
  },

  mounted() {
    this.modal = new Modal(this.$refs.create_company_modal);
  },

  methods: {
    // get company basic info from step one
    nextStep() {
      console.log("hi", this.$refs.create_company_modal_step_first);
      this.$refs.create_company_modal_step_first.companyProfileStepOne();
      if (
        this.$refs.create_company_modal_step_first.isStepOneProfileCompleted
      ) {
        this.basicCompanyData =
          this.$refs.create_company_modal_step_first.companyForm;
        this.activeStep = 2;
        console.log(
          "congrats ! company first step is completed successfully. ",
          this.basicCompanyData
        );
        this.countryData = this.basicCompanyData.country
          ? this.basicCompanyData.country
          : "";
      }
    },

    // back to step 1
    previousStep() {
      this.activeStep = 1;
    },
    // get company all infomarmation and merge and create new company
    addNewCompany() {
      console.log(
        "all data is comming from ",
        this.$refs.create_company_modal_step_second
      );
      this.$refs.create_company_modal_step_second.companyProfileSteptwo();

      if (
        this.$refs.create_company_modal_step_second.isStepTwoProfileCompleted
      ) {
        this.advCompanyData =
          this.$refs.create_company_modal_step_second.companyForm;
        // get merge company data for step one and step two
        if (
          this.basicCompanyData &&
          Object.keys(this.basicCompanyData).length &&
          this.advCompanyData &&
          Object.keys(this.advCompanyData).length
        ) {
          this.allCompanyData = {
            ...this.basicCompanyData,
            ...this.advCompanyData,
          };
          this.allCompanyData.company_mode = "profile";
          SignupService.companyBasicInfo(this.allCompanyData).then((res) => {
            if (res.data.status) {
              // update the company list
              this.$store.dispatch("getStaffsCompanies", {
                auth_token: this.staffData.auth_token,
              });
              this.closeModal();
              this.$router.push({ name: "Dashboard" });
            } else {
              errorhandler(res);
            }
          });
        }
      }
    },

    // close modal
    closeModal() {
      this.modal.hide();
      this.$refs.create_company_modal_step_first.clearForm();
      this.$refs.create_company_modal_step_second.clearForm();
    },
  },
};
</script>

<style lang="scss" scoped>
.company_modal_content {
  padding: 14px 30px;
}
.company_modal_header {
  display: block;
  padding: 0;
  border: 0 !important;
  text-align: center !important;
  .process_title_wrap {
    margin: 10px 0;
  }
  .process_title {
    font-weight: 700;
    font-size: 28px;
    line-height: 40px;
    margin-bottom: 0;
    color: #222b45;
  }
  .close_btn_wrap {
    position: absolute;
    top: 16px;
    right: 16px;
  }
}
.company_modal_body {
  padding: 0;
}
.stepper_container {
  max-width: 35%;
  margin: 0 auto;
}
</style>
