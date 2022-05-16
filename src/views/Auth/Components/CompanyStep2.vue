<template>
  <div>
    <div class="register_auth_wrapper">
      <div class="">
        <div v-if="creatingMode === 'signup'" class="">
          <div class="main-heading-wrap text-center">
            <h2 class="main-heading">{{ $t("company.main_title") }}</h2>
            <span class="step_title">{{
              $t("company.step_two.title_heading")
            }}</span>
          </div>
        </div>
        <div class="">
          <form @submit.prevent="saveCompanyInfoStep2" action="">
            <div class="row">
              <div class="col-lg-12">
                <div class="k_form_group">
                  <div class="check_box_wrapper">
                    <label class="k_checkbox check_lable">
                      {{ $t("company.step_two.as_Intlnal") }}

                      <p class="internation_check">
                        {{ $t("company.step_two.outside_country") }}
                        {{ getCountriesName(countriesArr) }}?
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
                <h5 class="section_heading">
                  {{ $t("company.step_two.geo_scope") }}
                </h5>

                <div class="row">
                  <!-- :placeholder="
                          $t('company.step_two.form.placeholder.region')
                        " -->
                  <div class="col-lg-6">
                    <div class="k_form_group k_select_single">
                      <MultiSelect
                        class="prime_multiselect"
                        :disabled="!companyForm.operating_international"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Economic Region"
                        :options="filterdRegionList(regionLists)"
                        @change="onChangeRegion"
                        v-model="companyForm.region"
                      />
                      <!-- :class="{
                          'is-invalid': v$.companyForm.region.$error,
                        }"

                      <div
                        v-if="v$.companyForm.region.$error"
                        class="invalid-feedback text-left"
                      >
                        <span
                          v-if="v$.companyForm.region.required.$invalid"
                          class="text-left fs-14"
                        >
                          Region is required
                        </span>
                      </div> -->
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="k_form_group k_select_single">
                      <MultiSelect
                        :disabled="!companyForm.operating_international"
                        class="prime_multiselect"
                        optionLabel="label"
                        optionValue="value"
                        :placeholder="
                          $t('company.step_two.form.placeholder.country')
                        "
                        :options="countryLists"
                        v-model="companyForm.company_country"
                      />
                      <!-- :class="{
                          'is-invalid': v$.companyForm.company_country.$error,
                        }"

                      <div
                        v-if="v$.companyForm.company_country.$error"
                        class="invalid-feedback text-left"
                      >
                        <span
                          v-if="
                            v$.companyForm.company_country.required.$invalid
                          "
                          class="text-left fs-14"
                        >
                          Country is required
                        </span>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="row">
                  <h5 class="section_heading">
                    {{ $t("company.step_two.reporting_currency") }}
                  </h5>
                  <div class="col-lg-6">
                    <div class="k_form_group k_select_single">
                      <Dropdown
                        class="k_prime_inp_select"
                        optionLabel="label"
                        optionValue="value"
                        :placeholder="
                          $t('company.step_two.form.placeholder.currency')
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
                          {{
                            $t(
                              "company.step_two.form.invalid_msgs.currency_is_required"
                            )
                          }}
                          <!-- Currency is required -->
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-12">
                <h5 class="section_heading">
                  {{ $t("company.step_two.industry_info") }}
                </h5>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="k_form_group k_select_single">
                      <Dropdown
                        class="k_prime_inp_select"
                        optionLabel="label"
                        optionValue="value"
                        :placeholder="
                          $t('company.step_two.form.placeholder.main_industry')
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
                          {{
                            $t(
                              "company.step_two.form.invalid_msgs.main_industry_is_required"
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
                          $t('company.step_two.form.placeholder.sub_industry')
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
                          {{
                            $t(
                              "company.step_two.form.invalid_msgs.sub_industry_is_required"
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
                          $t(
                            'company.step_two.form.placeholder.detailed_industry'
                          )
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
                          {{
                            $t(
                              "company.step_two.form.invalid_msgs.detailed_industry_is_required"
                            )
                          }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="creatingMode === 'signup'">
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
                      {{ $t("company.step_two.buttons.create_company") }}
                    </span>
                  </button>
                </div>
                <div class="im-user flex justify-center">
                  <span class="para14">
                    {{ $t("company.step_two.already_account") }}</span
                  >
                  <a @click="goTo" class="custom-link">{{
                    $t("company.step_two.buttons.sign_in")
                  }}</a>
                </div>
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
import MultiSelect from "primevue/multiselect";
import { mapGetters } from "vuex";
import {
  updateLocalStorage,
  updateSessionStorage,
} from "../../../utils/commonHelperFuntions";
import CommonService from "../../../Services/CommonService";

export default {
  components: {
    Dropdown,
    MultiSelect,
  },
  name: "CompanyStepTwo",

  props: {
    creatingMode: {
      type: String,
      default: "signup",
    },
    countryId: {
      type: String,
      default: "",
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
      // value: null,
      countriesArr: [],
      RegionsArr: [],
      companyForm: {
        auth_token: "",
        company_country: [],
        main_industry: null,
        sub_industry: null,
        detailed_industry: null,
        region: [],
        currency: "",
        operating_international: false,
      },
    };
  },

  watch: {
    // is Internatinal change...
    "companyForm.operating_international": function (val) {
      if (!val) {
        this.internationalCompany();
      } else {
        this.companyForm.region = this.RegionsArr;
        this.companyForm.company_country = [];
        this.companyForm.company_country.push(this.countriesArr);
        this.getCountries(this.companyForm.region);
      }
    },

    // country changed
    countryId: function () {
      this.companyForm.company_country = [];
      this.companyForm.company_country.push(this.countryId);
      // this.companyForm.operating_international = false;
      this.getRegions(this.countryId);
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
        // company_country: {
        //   required: requiredIf(() => this.companyForm.operating_international),
        // },
        // region: { required },
      },
    };
  },

  methods: {
    getCountriesName(value) {
      let mainCountry;
      this.countryLists.find((x) => {
        if (x.value == value) {
          mainCountry = x.label;
        }
      });
      return mainCountry;
    },

    // create company on company profile start
    companyProfileSteptwo() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        this.companyForm.auth_token = this.staffData.auth_token;
        this.isStepTwoProfileCompleted = true;
      }
    },

    // create company on company profile end

    goTo() {
      localStorage.removeItem("bWFpbCI6Inpvb");
      localStorage.removeItem("selected_company");
      localStorage.removeItem("selected_year");
      sessionStorage.removeItem("OiJKV1QiLCJhbGciOiJIUzI1");
      this.$router.push({ name: "signup-signin" });
    },

    visRedirect() {
      this.$router.push({ name: "signup-signin" });
    },

    internationalCompany() {
      this.companyForm.region = "";
      this.companyForm.company_country = "";
    },

    saveCompanyInfoStep2() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        this.companyForm.auth_token = this.staffData.auth_token;
        this.isSubmitted = true;
        SignupService.companyClassificationInfo(this.companyForm)
          .then((response) => {
            if (response.data.status) {
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

    clearForm() {
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
    },

    formReset() {
      this.clearForm();
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

    // onFilePicked(event) {
    //   this.valiImage = true;
    //   const files = event.target.files;
    //   let $th = this;
    //   console.log("seelcted Files", files);
    //   if (files != "undefined" && files.length > 0) {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(files[0]);
    //     reader.onload = function (e) {
    //       var image = new Image(); //Set the Base64 string return from FileReader as source.
    //       image.src = e.target.result;
    //       image.onload = function () {
    //         $th.uploadCompanyLogo(files[0]);
    //       };
    //     };
    //   } else {
    //     return true;
    //   }
    // },

    // removeImage() {
    //   this.defaultImg = "icons/cloud-upload.svg";
    // },

    // uploadCompanyLogo(file) {
    //   let $th = this;
    //   var reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = function () {
    //     $th.defaultImg = reader.result.toString();
    //     $th.companyForm.client_logo = $th.defaultImg;
    //     console.log($th.defaultImg);
    //   };
    //   reader.onerror = function (error) {
    //     console.log("Error: ", error);
    //   };
    //   // this.getBase64(file);
    //   console.log("selected file", file);
    // },

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
      // console.log("country_lists", this.companyForm.company_country);
      this.getCountries(this.companyForm.region);
    },

    // onChangeCountry() {
    //   console.log("country_lists", this.companyForm.company_country);
    // },

    // get regions lists
    getRegions() {
      if (this.countryId !== "" && this.countryId !== undefined) {
        this.getSelctedRegion();
        this.countriesArr = this.countryId;
        this.$store.dispatch("GET_REGION_BY_COUNTRY", this.countryId);
      } else {
        this.$store.dispatch("GET_ALL_REGION");
        // this.$store.dispatch("GET_REGION_BY_COUNTRY");
      }
    },

    filterdRegionList(regArr) {
      let arr = regArr.filter((item) => {
        return this.RegionsArr.includes(item.value);
      });
      return arr;
    },

    getSelctedRegion() {
      CommonService.getRegionByCountryId(this.countryId).then((res) => {
        if (res.data.status) {
          let selectedRegions = res.data.data.map((item) => {
            return item.id;
          });
          this.RegionsArr = selectedRegions;
        } else {
          errorhandler(res);
        }
      });
    },

    // get country lists
    getCountries(id) {
      this.$store.dispatch("GET_COUNTRIES", { region_id: id });
    },

    checkCompany() {
      if (this.staffData != null) {
        SignupService.checkCompany({
          auth_token: this.staffData.auth_token,
        }).then((resp) => {
          if (resp.data.status) {
            this.countriesArr = resp.data.data.first_country_id;
            this.RegionsArr = resp.data.data.regions;
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
