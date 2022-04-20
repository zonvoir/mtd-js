<template>
  <div>
    <div class="register_auth_wrapper">
      <div class="">
        <div v-if="creatingMode === 'signup'" class="">
          <div class="main-heading-wrap text-center">
            <h2 class="main-heading">Setup your company</h2>
            <span class="step_title">Step 2: Company Classification</span>
          </div>
        </div>
        <div class="">
          <form @submit.prevent="saveCompanyInfoStep2" action="">
            <div class="row">
              <div class="col-lg-12">
                <div class="k_form_group">
                  <div class="check_box_wrapper">
                    <label class="k_checkbox check_lable">
                      Is your company operating internationally?
                      <p class="internation_check">
                        "(Outside of ..country..?)"
                      </p>

                      <input
                        type="checkbox"
                        v-model="companyForm.operating_international"
                        checked="checked"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="col-lg-12">
                <h5 class="section_heading">Geographical Scope</h5>

                <div class="row">
                  <div class="col-lg-6">
                    <div class="k_form_group k_select_single">
                      <Dropdown
                        class="k_prime_inp_select"
                        :disabled="!companyForm.operating_international"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="
                   Region
                  "
                        :options="regionLists"
                        @change="onChangeRegion"
                        v-model="companyForm.region"
                      />
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="k_form_group k_select_single">
                      <Dropdown
                        :disabled="!companyForm.operating_international"
                        class="k_prime_inp_select"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="
                   Country
                  "
                        :options="countryLists"
                        @change="onChangeCountry"
                        v-model="companyForm.company_country"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="row">
                  <h5 class="section_heading">Reporting Currency</h5>
                  <div class="col-lg-6">
                    <div class="k_form_group k_select_single">
                      <Dropdown
                        class="k_prime_inp_select"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="
                   Currency
                  "
                        :options="currencyLists"
                        v-model="companyForm.currency"
                        @blur="v$.companyForm.currency.$touch"
                        :class="{
                          'is-invalid': v$.companyForm.currency.$error,
                        }"
                      />

                      <div
                        v-if="v$.companyForm.currency.$error"
                        class="invalid-feedback text-left"
                      >
                        <span
                          v-if="v$.companyForm.currency.required.$invalid"
                          class="text-left fs-14"
                        >
                          Currency is required
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-12">
                <h5 class="section_heading">Industry Information</h5>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="k_form_group k_select_single">
                      <Dropdown
                        class="k_prime_inp_select"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="
                   Main Industry
                  "
                        :options="industryLists"
                        @change="onChangeMainIndustry"
                        @blur="v$.companyForm.main_industry.$touch"
                        v-model="companyForm.main_industry"
                        :class="{
                          'is-invalid': v$.companyForm.main_industry.$error,
                        }"
                      />

                      <div
                        v-if="v$.companyForm.main_industry.$error"
                        class="invalid-feedback text-left"
                      >
                        <span
                          v-if="v$.companyForm.main_industry.required.$invalid"
                          class="text-left fs-14"
                        >
                          Main industry is required
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="k_form_group k_select_single">
                      <Dropdown
                        class="k_prime_inp_select"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="
                   Sub Industry
                  "
                        :options="subIndustryLists"
                        @change="onChangeSubIndustry"
                        @blur="v$.companyForm.sub_industry.$touch"
                        v-model="companyForm.sub_industry"
                        :class="{
                          'is-invalid': v$.companyForm.sub_industry.$error,
                        }"
                      />

                      <div
                        v-if="v$.companyForm.sub_industry.$error"
                        class="invalid-feedback text-left"
                      >
                        <span
                          v-if="v$.companyForm.sub_industry.required.$invalid"
                          class="text-left fs-14"
                        >
                          Sub industry is required
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="k_form_group k_select_single">
                      <Dropdown
                        class="k_prime_inp_select"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="
                   Detailed Industry
                  "
                        :options="detailedIndustryLists"
                        @blur="v$.companyForm.detailed_industry.$touch"
                        v-model="companyForm.detailed_industry"
                        :class="{
                          'is-invalid': v$.companyForm.detailed_industry.$error,
                        }"
                      />
                      <div
                        v-if="v$.companyForm.detailed_industry.$error"
                        class="invalid-feedback text-left"
                      >
                        <span
                          v-if="
                            v$.companyForm.detailed_industry.required.$invalid
                          "
                          class="text-left fs-14"
                        >
                          Detailed industry is required
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="creatingMode === 'signup'">
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
                  <span v-else> Create Company </span>
                </button>
              </div>
              <div class="im-user flex justify-center">
                <span class="para14"> Already have an account?</span>
                <a @click="goTo" target="_blank" class="custom-link">Sign In</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import SignupService from "../../../Services/SignupService";
import errorhandler from "../../../utils/Error";
import Dropdown from "primevue/dropdown";
import { mapGetters } from "vuex";
import {
  updateLocalStorage,
  updateSessionStorage,
} from "../../../utils/commonHelperFuntions";

export default {
  components: {
    Dropdown,
  },
  name: "CompanyStepTwo",

  props: {
    creatingMode: {
      type: String,
      default: "signup",
    },
  },

  data() {
    return {
      isStepTwoProfileCompleted: false,
      valiImage: true,
      isSubmitted: false,
      country_flag: "",
      country_code: undefined,
      codeWithNumber: "",
      numberPattern: /[0-9]/,
      defaultImg: "icons/cloud-upload.svg",
      staffData:
        JSON.parse(sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1")) ||
        JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      value: null,
      companyForm: {
        auth_token: "",
        company_country: "",
        main_industry: null,
        sub_industry: null,
        detailed_industry: null,
        region: null,
        currency: "",
        operating_international: false,
      },
    };
  },

  watch: {
    "companyForm.operating_international": function (val) {
      console.log(val);
      if (!val) {
        this.internationalCompany();
      }
    },
  },

  computed: {
    ...mapGetters({
      currencyLists: "allCurrency",
      industryLists: "mainIndustries",
      subIndustryLists: "subIndustries",
      detailedIndustryLists: "detailIndustries",
      countryLists: "allCountries",
      regionLists: "allRegion",
    }),
  },

  created() {
    this.$store.dispatch("GET_ALL_CURRENCY");
    if (this.creatingMode === "signup") {
      this.checkCompany();
    }
    this.getIndustryList();
    this.getRegions();
    this.getCountries();
  },

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  validations() {
    return {
      companyForm: {
        main_industry: { required },
        sub_industry: { required },
        detailed_industry: { required },
        currency: { required },
      },
    };
  },

  methods: {
    // create comapny on company profile start
    companyProfileSteptwo() {
      console.log("I am from company step two form");
      this.v$.$touch();
      if (!this.v$.$invalid) {
        this.companyForm.auth_token = this.staffData.auth_token;
        this.isStepTwoProfileCompleted = true;
        console.log("this form is fully valid step 2");
      }
    },

    // create comapny on company profile end

    goTo() {
      localStorage.removeItem("bWFpbCI6Inpvb");
      localStorage.removeItem("selected_company");
      localStorage.removeItem("language");
      localStorage.removeItem("selected_year");
      sessionStorage.removeItem("OiJKV1QiLCJhbGciOiJIUzI1");
      this.$store.dispatch("GET_STAFF_DATA", null);
      this.$router.push({ name: "signup-signin" });
    },

    visRedirect() {
      this.$router.push({ name: "signup-signin" });
    },

    internationalCompany() {
      this.companyForm.region = null;
      this.companyForm.company_country = null;
    },

    saveCompanyInfoStep2() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        this.companyForm.auth_token = this.staffData.auth_token;
        console.log("company data", this.companyForm);
        this.isSubmitted = true;
        SignupService.companyClassificationInfo(this.companyForm)
          .then((response) => {
            if (response.data.status) {
              console.log("COMPANY INFOMATION", response.data.data);
              this.$store.dispatch("getCompanyInfoDetails", response.data.data);
              this.checkCompany();
              if (
                localStorage.getItem("bWFpbCI6Inpvb") != null ||
                sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") != null
              ) {
                let memberStaffData = {
                  auth_token: response.data.data.auth_token,
                  is_first_step_complete: true,
                  is_second_step_complete: true,
                  is_career_information_setup: true,
                };
                if (
                  sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") != null
                ) {
                  sessionStorage.setItem(
                    "OiJKV1QiLCJhbGciOiJIUzI1",
                    JSON.stringify(memberStaffData)
                  );
                } else {
                  localStorage.setItem(
                    "bWFpbCI6Inpvb",
                    JSON.stringify(memberStaffData)
                  );
                }
              }

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
      this.v$.$reset();
      this.companyForm = {
        company_country: "",
        main_industry: null,
        sub_industry: null,
        detailed_industry: null,
        region: null,
        currency: "",
        operating_international: false,
      };

      if (
        localStorage.getItem("bWFpbCI6Inpvb") != null ||
        sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") != null
      ) {
        this.staffData.is_second_step_complete = true;
        this.staffData.is_first_step_complete = true;
        this.staffData.is_career_information_setup = true;

        if (sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") != null) {
          sessionStorage.setItem(
            "OiJKV1QiLCJhbGciOiJIUzI1",
            JSON.stringify(this.staffData)
          );
        } else {
          localStorage.setItem("bWFpbCI6Inpvb", JSON.stringify(this.staffData));
        }

        // below two lines added
        this.checkCompany();
        this.$router.push({ name: "signin-verify-account" });
        // this.$router.push({ name: "Dashboard" });
      } else {
        this.$router.push({ name: "signup-signin" });
      }
    },

    isNumber(event) {
      let char = String.fromCharCode(event.keyCode);
      if (this.numberPattern.test(char)) return true;
      else event.preventDefault();
    },

    // file select
    onPickFile() {
      this.$refs.fileInput.click();
    },

    onFilePicked(event) {
      this.valiImage = true;
      const files = event.target.files;
      let $th = this;
      console.log("seelcted Files", files);
      if (files != "undefined" && files.length > 0) {
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function (e) {
          var image = new Image(); //Set the Base64 string return from FileReader as source.
          image.src = e.target.result;
          image.onload = function () {
            $th.uploadCompanyLogo(files[0]);
          };
        };
      } else {
        return true;
      }
    },

    removeImage() {
      this.defaultImg = "icons/cloud-upload.svg";
    },

    uploadCompanyLogo(file) {
      let $th = this;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        $th.defaultImg = reader.result.toString();
        $th.companyForm.client_logo = $th.defaultImg;
        console.log($th.defaultImg);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
      // this.getBase64(file);
      console.log("selected file", file);
    },

    // get Industry lists
    getIndustryList() {
      this.$store.dispatch("GET_MAIN_INDUSTRIES");
    },

    onChangeMainIndustry() {
      this.$store.dispatch(
        "GET_SUB_INDUSTRIES",
        this.companyForm.main_industry
      );
    },

    onChangeSubIndustry() {
      this.$store.dispatch(
        "GET_DEATAIL_INDUSTRIES",
        this.companyForm.sub_industry
      );
    },

    onChangeRegion() {
      this.getCountries(this.companyForm.region);
    },

    onChangeCountry() {
      console.log("Detail Industry", this.companyForm.company_country);
    },

    // get regions lists
    getRegions() {
      this.$store.dispatch("GET_ALL_REGION");
    },

    // get country lists
    getCountries(id) {
      this.$store.dispatch("GET_COUNTRIES", id);
    },

    checkCompany() {
      if (this.staffData != null) {
        SignupService.checkCompany({
          auth_token: this.staffData.auth_token,
        }).then((resp) => {
          if (resp.data.status) {
            console.log("there company is already setup", resp.data.data);

            // update session Storage
            if (sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") != null) {
              updateSessionStorage("OiJKV1QiLCJhbGciOiJIUzI1", [
                {
                  is_first_step_complete: resp.data.data.is_first_step_complete,
                },
                {
                  is_second_step_complete:
                    resp.data.data.is_second_step_complete,
                },
              ]);
            }

            // update local Storage
            if (localStorage.getItem("bWFpbCI6Inpvb") != null) {
              updateLocalStorage("bWFpbCI6Inpvb", [
                {
                  is_first_step_complete: resp.data.data.is_first_step_complete,
                },
                {
                  is_second_step_complete:
                    resp.data.data.is_second_step_complete,
                },
              ]);
            }

            if (!resp.data.data.is_first_step_complete) {
              this.$router.push({ name: "company-step-one" });
            } else if (!resp.data.data.is_second_step_complete) {
              this.$router.push({ name: "company-step-two" });
            } else {
              this.$router.push({ name: "signin-verify-account" });
            }
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.internation_check {
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: inherit;
  margin-bottom: 0;
}
.phone_main_wrap {
  width: 82%;
  float: right;
}
.cust_err {
  position: absolute;
  top: 100%;
}
.country_flag {
  width: 2rem;
  position: relative;
  top: 16%;
  left: 0%;
}
.country_code_wrap {
  position: absolute;
  top: 0px;
  left: 14%;
  background: transparent !important;
  width: auto;
  height: 42px;
}
.country_code {
  font-style: 500;
  font-size: 16px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 11%;
  bottom: 0;
  padding: 5px;
  z-index: 99;
}
.country_flag_wrap {
  width: 18%;
  float: left;
  background-color: #ced4da;
  text-align: center;
}
.confidencil_msg_body {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 79.69%,
    #ffffff 100%
  );
  border-radius: 4px;
}
.temrs_para {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #222b45;
  text-align: justify;
}
.header_wrap {
  display: flex;
  align-items: center;
  padding: 10px 30px;
  width: 100%;
}
.conf_header {
  background: #edf1f7;
  border-radius: 4px 4px 0px 0px;
}
.terms_title {
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
}
.wrap_phone_inp {
  position: relative;
  .phone_field {
    width: 100%;
    .shift_number {
      padding-left: 6.8rem !important;
    }
  }
  .codes_select {
    position: absolute;
    left: -3px;
    top: -3px;
  }
}
.upload_image_wrapper {
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
  .logo_holder {
    width: 6rem;
    cursor: pointer;
  }
  .logo_action_container {
    margin-left: 20px;
    .action_btns_wrap {
      padding-bottom: 10px;
    }
  }
}
</style>
