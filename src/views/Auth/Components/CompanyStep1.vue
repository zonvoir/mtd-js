<template>
  <div>
    <div class="register_auth_wrapper">
      <div class="">
        <div v-if="creatingMode === 'signup'" class="">
          <div class="main-heading-wrap text-center">
            <h2 class="main-heading">{{ $t("company.main_title") }}</h2>
            <span class="step_title">
              {{ $t("company.step_one.title_heading") }}</span
            >
          </div>
        </div>
        <div class="">
          <form @submit.prevent="saveCompanyInfo" action="">
            <div class="upload_image_wrapper">
              <div @click="onPickFile" class="logo_holder">
                <div class="c_logo_container">
                  <img :src="defaultImg" class="upload_logo" />
                </div>
              </div>

              <div class="logo_action_container">
                <div class="action_btns_wrap">
                  <input
                    type="file"
                    style="display: none"
                    ref="fileInput"
                    accept="image/*"
                    @change="onFilePicked"
                  />

                  <button
                    type="button"
                    @click="onPickFile"
                    class="btn k_btnfs14_w700 btn-primary m-r-20"
                  >
                    {{ $t("company.step_one.buttons.upload_logo") }}
                  </button>
                  <button
                    @click="removeImage"
                    type="button"
                    class="btn k_btnfs14_w700 btn-basic-3"
                  >
                    {{ $t("company.step_one.buttons.remove") }}
                  </button>
                </div>
                <div class="hint_message_wrap">
                  <p class="text-secodary m-b-0">
                    {{ $t("company.step_one.image_size") }}
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <h5 class="section_heading">
                  {{ $t("company.step_one.basic_details") }}
                </h5>
              </div>
              <div :class="classLayout">
                <div class="k_form_group">
                  <input
                    type="text"
                    class="form-control k_inp_field"
                    :placeholder="
                      $t('company.step_one.form.placeholder.company_name')
                    "
                    @blur="v$.companyForm.company.$touch"
                    v-model="companyForm.company"
                    :class="{
                      'is-invalid': v$.companyForm.company.$error,
                    }"
                  />
                  <div
                    v-if="v$.companyForm.company.$error"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="v$.companyForm.company.required.$invalid"
                      class="text-left fs-14"
                    >
                      {{
                        $t(
                          "company.step_one.form.invalid_msgs.company_name_is_required"
                        )
                      }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="k_form_group">
                  <input
                    type="text"
                    class="form-control k_inp_field"
                    :placeholder="
                      $t('company.step_one.form.placeholder.company_id')
                    "
                    @blur="v$.companyForm.companyId.$touch"
                    v-model="companyForm.companyId"
                    :class="{
                      'is-invalid': v$.companyForm.companyId.$error,
                    }"
                  />
                  <div
                    v-if="v$.companyForm.companyId.$error"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="v$.companyForm.companyId.required.$invalid"
                      class="text-left fs-14"
                    >
                      {{
                        $t(
                          "company.step_one.form.invalid_msgs.company_id_is_required"
                        )
                      }}
                    </span>
                    <span
                      v-if="v$.companyForm.companyId.alphaNum.$invalid"
                      class="text-left fs-14"
                    >
                      Company Id accept alfanumeric.
                    </span>
                    <span
                      v-if="v$.companyForm.companyId.maxLengthValue.$invalid"
                      class="text-left fs-14"
                    >
                      Company Id can't be more than 12 digits.
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
                    :placeholder="
                      $t('company.step_one.form.placeholder.legal_form')
                    "
                    :options="legalCorpLists"
                    @blur="v$.companyForm.corporation_legal_form.$touch"
                    v-model="companyForm.corporation_legal_form"
                    :class="{
                      'is-invalid':
                        v$.companyForm.corporation_legal_form.$error,
                    }"
                  />

                  <div
                    v-if="v$.companyForm.corporation_legal_form.$error"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="
                        v$.companyForm.corporation_legal_form.required.$invalid
                      "
                      class="text-left fs-14"
                    >
                      {{
                        $t(
                          "company.step_one.form.invalid_msgs.legal_form_is_required"
                        )
                      }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="k_form_group">
                  <input
                    type="text"
                    class="form-control k_inp_field"
                    :placeholder="
                      $t('company.step_one.form.placeholder.incorp_year')
                    "
                    maxlength="4"
                    minlength="4"
                    @keypress="isNumber"
                    @blur="v$.companyForm.incorporation_year.$touch"
                    v-model="companyForm.incorporation_year"
                    :class="{
                      'is-invalid': v$.companyForm.incorporation_year.$error,
                    }"
                  />
                  <div
                    v-if="v$.companyForm.incorporation_year.$error"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="
                        v$.companyForm.incorporation_year.maxValueValue.$invalid
                      "
                      class="text-left fs-14"
                    >
                      Please enter valid year
                    </span>
                    <span
                      v-if="
                        v$.companyForm.incorporation_year.minLengthValue
                          .$invalid
                      "
                      class="text-left fs-14"
                    >
                      Year must be 4 digits
                    </span>
                    <span
                      v-if="v$.companyForm.incorporation_year.required.$invalid"
                      class="text-left fs-14"
                    >
                      {{
                        $t(
                          "company.step_one.form.invalid_msgs.incorp_year_is_required"
                        )
                      }}
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
                    :placeholder="
                      $t('company.step_one.form.placeholder.country')
                    "
                    :options="countryLists"
                    @blur="v$.companyForm.country.$touch"
                    @change="onChangeCountry"
                    v-model="companyForm.country"
                    :class="{
                      'is-invalid': v$.companyForm.country.$error,
                    }"
                  />

                  <div
                    v-if="v$.companyForm.country.$error"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="v$.companyForm.country.required.$invalid"
                      class="text-left fs-14"
                    >
                      {{
                        $t(
                          "company.step_one.form.invalid_msgs.country_is_required"
                        )
                      }}
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
                      State/Region
                    "
                    :options="allStates"
                    @blur="v$.companyForm.state.$touch"
                    @change="getAllCites(companyForm.state)"
                    v-model="companyForm.state"
                    :class="{
                      'is-invalid': v$.companyForm.state.$error,
                    }"
                  />

                  <div
                    v-if="v$.companyForm.state.$error"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="v$.companyForm.state.required.$invalid"
                      class="text-left fs-14"
                    >
                      State is required
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
                      City
                    "
                    :options="allCities"
                    @blur="v$.companyForm.city.$touch"
                    v-model="companyForm.city"
                    :class="{
                      'is-invalid': v$.companyForm.city.$error,
                    }"
                  />

                  <div
                    v-if="v$.companyForm.city.$error"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="v$.companyForm.city.required.$invalid"
                      class="text-left fs-14"
                    >
                      City is required
                    </span>
                  </div>
                </div>
              </div>
              <div :class="classLayout">
                <div class="k_form_group">
                  <input
                    type="text"
                    class="form-control k_inp_field"
                    :placeholder="
                      $t('company.step_one.form.placeholder.address')
                    "
                    @blur="v$.companyForm.address.$touch"
                    v-model="companyForm.address"
                    :class="{
                      'is-invalid': v$.companyForm.address.$error,
                    }"
                  />
                  <div
                    v-if="v$.companyForm.address.$error"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="v$.companyForm.address.required.$invalid"
                      class="text-left fs-14"
                    >
                      {{
                        $t(
                          "company.step_one.form.invalid_msgs.address_is_required"
                        )
                      }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="k_form_group">
                  <div class="check_box_wrapper">
                    <label class="k_checkbox check_lable">
                      {{ $t("company.step_one.as_consultant") }}

                      <input
                        type="checkbox"
                        v-model="companyForm.isConsultant"
                        checked="checked"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
                <h5 class="section_heading">
                  {{ $t("company.step_one.main_contact") }}
                </h5>
              </div>

              <div class="col-lg-6">
                <div class="input-group k_form_group d-flex">
                  <div class="country_flag_wrap">
                    <img
                      v-if="country_flag"
                      :src="country_flag"
                      class="country_flag"
                      alt=""
                    />
                  </div>
                  <div class="phone_main_wrap">
                    <div class="d-flex w-100">
                      <span v-if="country_code" class="country_code">
                        (+{{ country_code }})
                      </span>
                      <span v-else class="country_code"> (+91) </span>
                      <input
                        class="form-control k_inp_field cus_ph_inp"
                        aria-label="Phonenumber"
                        aria-describedby="basic-addon1"
                        type="text"
                        @keypress="isNumber"
                        :placeholder="
                          $t('company.step_one.form.placeholder.phone')
                        "
                        @blur="v$.companyForm.phonenumber.$touch"
                        v-model="companyForm.phonenumber"
                        :class="{
                          'is-invalid': v$.companyForm.phonenumber.$error,
                        }"
                      />
                      <div
                        v-if="v$.companyForm.phonenumber.$error"
                        class="invalid-feedback cust_err text-left"
                      >
                        <span
                          v-if="v$.companyForm.phonenumber.required.$invalid"
                          class="text-left fs-14"
                        >
                          {{
                            $t(
                              "company.step_one.form.invalid_msgs.phone_is_required"
                            )
                          }}
                        </span>
                        <span
                          v-if="
                            v$.companyForm.phonenumber.minLengthValue.$invalid
                          "
                          class="text-left fs-14"
                        >
                          Phone Number at least 6 digits
                        </span>
                        <span
                          v-if="
                            v$.companyForm.phonenumber.maxLengthValue.$invalid
                          "
                          class="text-left fs-14"
                        >
                          Phone must contain 6 to 15 digits
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="creatingMode === 'signup'" class="">
              <div class="space_btn">
                <div class="d-grid">
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
                    <span v-else>
                      {{ $t("company.step_one.buttons.next") }}
                    </span>
                  </button>
                </div>
                <div class="im-user flex justify-center">
                  <span class="para14">
                    {{ $t("company.step_one.already_account") }}</span
                  >
                  <a @click="goTo" class="custom-link">
                    {{ $t("company.step_one.buttons.sign_in") }}</a
                  >
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div v-if="creatingMode === 'signup'" class="">
    <TermsConditionsModal ref="terms" />
  </div>
</template>

<script>
import {
  required,
  numeric,
  alphaNum,
  maxLength,
  minLength,
  maxValue,
} from "@vuelidate/validators";

import useVuelidate from "@vuelidate/core";
import TermsConditionsModal from "./TermsConditionsModal.vue";

import Dropdown from "primevue/dropdown";
import { mapGetters } from "vuex";
import CommonService from "../../../Services/CommonService";
import SignupService from "../../../Services/SignupService";
import errorhandler from "../../../utils/Error";
import {
  updateLocalStorage,
  updateSessionStorage,
} from "../../../utils/commonHelperFuntions";

export default {
  emits: ["stepStatus"],
  name: "CompanyStepOne",
  props: {
    creatingMode: {
      type: String,
      default: "signup",
    },
    classLayout: {
      type: String,
      default: "col-lg-12",
    },
  },

  components: {
    Dropdown,
    TermsConditionsModal,
  },

  data() {
    return {
      isStepOneProfileCompleted: false,
      // isStepTwoCompleted:false,
      termsData: JSON.parse(localStorage.getItem("terms_condtions")),
      valiImage: true,
      isPageFilled: false,
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
        company: "",
        country: "",
        state: "",
        city: "",
        companyId: "",
        address: "",
        isConsultant: false,
        phonenumber: "",
        incorporation_year: "",
        client_logo: "",
        country_code: "",
        corporation_legal_form: "",
      },
    };
  },

  computed: {
    ...mapGetters({
      countryLists: "allCountries",
      legalCorpLists: "allLegalFormCorporation",
      agreedToPrivacyStatus: "agreedToPrivacyStatus",
      allStates: "allStates",
      allCities: "allCities",
    }),
  },

  mounted() {
    if (!this.staffData.is_first_step_complete && !this.agreedToPrivacyStatus) {
      this.$refs.terms.modal.show();
    }
  },

  created() {
    this.getLegalCoporation();
    if (this.creatingMode === "signup") {
      this.checkCompany();
    }
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
        company: { required },
        country: { required },
        state: { required },
        city: { required },
        phonenumber: {
          required,
          numeric,
          maxLengthValue: maxLength(15),
          minLengthValue: minLength(6),
        },
        companyId: {
          required,
          alphaNum,
          maxLengthValue: maxLength(12),
        },
        address: { required },
        incorporation_year: {
          required,
          minLengthValue: minLength(4),
          maxValueValue: maxValue(new Date().getFullYear()),
        },
        corporation_legal_form: { required },
      },
    };
  },

  beforeUnmount() {
    if (this.creatingMode === "signup") {
      this.$refs.terms.modal.hide();
      if (document.querySelector(".modal-backdrop")) {
        document.querySelector(".modal-backdrop").remove();
      }
    }
  },

  methods: {
    // create company on company profile start
    companyProfileStepOne() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        this.companyForm.auth_token = this.staffData.auth_token;
        this.companyForm.country_code = this.country_code;
        this.isStepOneProfileCompleted = true;
      }
    },

    // create company on company profile end

    // go to sign In pages
    goTo() {
      localStorage.removeItem("bWFpbCI6Inpvb");
      localStorage.removeItem("selected_company");
      localStorage.removeItem("selected_year");
      sessionStorage.removeItem("OiJKV1QiLCJhbGciOiJIUzI1");
      this.$router.push({ name: "signup-signin" });
    },

    // save company basic details step 1
    saveCompanyInfo() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        this.companyForm.auth_token = this.staffData.auth_token;
        this.companyForm.country_code = this.country_code;
        this.companyForm.created_by_me = "1";
        this.isPageFilled = true;
        this.isSubmitted = true;
        SignupService.companyBasicInfo(this.companyForm)
          .then((response) => {
            if (response.data.status) {
              this.$store.dispatch("getCompanyInfoDetails", response.data.data);
              // set local storage Data
              if (
                localStorage.getItem("bWFpbCI6Inpvb") != null ||
                sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") != null
              ) {
                let memberStaffData = {
                  auth_token: response.data.data.auth_token,
                  is_first_step_complete: true,
                  is_second_step_complete: false,
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
              // error notifications
              errorhandler(response);
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

    // clear company form
    clearForm() {
      this.v$.$reset();
      this.country_flag = "";
      this.country_code = "";
      this.companyForm = {
        company: "",
        country: "",
        state: "",
        city: "",
        main_industry: "",
        sub_industry: "",
        corporation_legal_form: "",
        company_role: "",
        region: "",
        phonenumber: "",
        incorporation_year: "",
        client_logo: "",
        detailed_industry: "",
      };
    },

    // trigger clear comapny form and send to company step 2
    formReset() {
      this.clearForm();

      if (
        localStorage.getItem("bWFpbCI6Inpvb") != null ||
        sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") != null
      ) {
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

        this.checkCompany();
        this.$router.push({ name: "company-step-two" });
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

    // pick company profile image
    onFilePicked(event) {
      this.valiImage = true;
      const files = event.target.files;
      let $th = this;
      const allowedExtensions = ["png", "jpg", "jpeg"];
      if (files != "undefined" && files.length > 0) {
        var filename = files[0].name;
        const fileExtension = filename.split(".").pop();
        if (!allowedExtensions.includes(fileExtension)) {
          errorhandler(" File type must be (.png , .jpg , .jpeg) only.");
        } else {
          var reader = new FileReader();
          reader.readAsDataURL(files[0]);
          reader.onload = function (e) {
            var image = new Image(); //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;
            image.onload = function () {
              $th.uploadCompanyLogo(files[0]);
            };
          };
        }
      } else {
        return true;
      }
    },

    // remove selected image
    removeImage() {
      this.defaultImg = "icons/cloud-upload.svg";
    },

    // set comapny profile data to a variable
    uploadCompanyLogo(file) {
      let $th = this;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        $th.defaultImg = reader.result.toString();
        $th.companyForm.client_logo = $th.defaultImg;
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },

    // on change country
    onChangeCountry() {
      this.$store.dispatch("GET_STATES_BY_COUNTRY", "");
      this.$store.dispatch("GET_CITIES_BY_STATE_ID", "");
      this.getAllStates(this.companyForm.country);
      this.selectedCountryCode(+this.companyForm.country);
    },

    // get legal Corporation lists
    getLegalCoporation() {
      this.$store.dispatch("GET_ALL_LEGAL_FORM_CORPORATION");
    },

    // get country lists
    // id
    getCountries() {
      this.$store.dispatch("GET_COUNTRIES");
    },

    // get states lists
    // id
    getAllStates(id) {
      if (id) {
        this.$store.dispatch("GET_STATES_BY_COUNTRY", id);
      } else {
        this.$store.dispatch("GET_STATES_BY_COUNTRY");
      }
    },

    // get city lists
    // id
    getAllCites(id) {
      if (id) {
        this.$store.dispatch("GET_CITIES_BY_STATE_ID", id);
      } else {
        this.$store.dispatch("GET_CITIES_BY_STATE_ID");
      }
    },

    // check comapny  step 1 is completed or not
    checkCompany() {
      if (this.staffData != null) {
        SignupService.checkCompany({
          auth_token: this.staffData.auth_token,
        }).then((resp) => {
          if (resp.data.status) {
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

    // get country flag and country code by selected country id
    selectedCountryCode(id) {
      CommonService.getCountryCode({ country_id: id }).then((resp) => {
        if (resp.data.status) {
          this.country_flag = resp.data.data.image;
          this.country_code = resp.data.data.code;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
