<template>
  <div>
    <div class="form_container">
      <div class="">
        <form @submit.prevent="saveCompanyInfo" action="">
          <div class="upload_image_wrapper">
            <div class="logo_holder1">
              <div @click="onPickFile" class="c_logo_container">
                <img
                  :src="defaultImg"
                  class="upload_logo"
                  :class="{ 'zp-20': defualtImg == 'icons/cloud-upload.svg' }"
                />
              </div>
            </div>

            <div class="logo_action_container1">
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
                  class="btn k_btnfs14_w700 text-uppercase btn-primary m-r-20"
                >
                  {{
                    $t(
                      "company_profile.company_tab.company_setup_update.form.buttons.upload_logo"
                    )
                  }}
                </button>
                <button
                  @click="removeImage"
                  type="button"
                  class="btn k_btnfs14_w700 text-uppercase btn-basic-3"
                >
                  {{
                    $t(
                      "company_profile.company_tab.company_setup_update.form.buttons.remove"
                    )
                  }}
                </button>
              </div>
              <div class="hint_message_wrap">
                <p v-if="valiImage" class="text-secodary m-t-10">
                  {{
                    $t(
                      "company_profile.company_tab.company_setup_update.form.invalid_msgs.image_hint"
                    )
                  }}
                </p>
                <p v-else class="text-danger m-t-10">
                  {{
                    $t(
                      "company_profile.company_tab.company_setup_update.form.invalid_msgs.image_hint"
                    )
                  }}
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="k_form_group">
                <input
                  type="text"
                  ref="focusInp"
                  class="form-control k_inp_field"
                  :placeholder="
                    $t(
                      'company_profile.company_tab.company_setup_update.form.placeholder.company_name'
                    )
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
                        "company_profile.company_tab.company_setup_update.form.invalid_msgs.company_name_is_required"
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
                      'company_profile.company_tab.company_setup_update.form.placeholder.own_role_company'
                    )
                  "
                  :options="ownRoleLists"
                  @blur="v$.companyForm.company_role.$touch"
                  v-model="companyForm.company_role"
                  :class="{
                    'is-invalid': v$.companyForm.company_role.$error,
                  }"
                />

                <div
                  v-if="v$.companyForm.company_role.$error"
                  class="invalid-feedback text-left"
                >
                  <span
                    v-if="v$.companyForm.company_role.required.$invalid"
                    class="text-left fs-14"
                  >
                    {{
                      $t(
                        "company_profile.company_tab.company_setup_update.form.invalid_msgs.own_role_company_is_required"
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
                      'company_profile.company_tab.company_setup_update.form.placeholder.legal_form_corporation'
                    )
                  "
                  :options="legalCorpLists"
                  @blur="v$.companyForm.corporation_legal_form.$touch"
                  v-model="companyForm.corporation_legal_form"
                  :class="{
                    'is-invalid': v$.companyForm.corporation_legal_form.$error,
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
                        "company_profile.company_tab.company_setup_update.form.invalid_msgs.legal_form_corporation_is_required"
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
                    {{
                      $t(
                        "company_profile.company_tab.company_setup_update.form.invalid_msgs.main_industry_is_required"
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
                    {{
                      $t(
                        "company_profile.company_tab.company_setup_update.form.invalid_msgs.sub_industry_is_required"
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
                    v-if="v$.companyForm.detailed_industry.required.$invalid"
                    class="text-left fs-14"
                  >
                    {{
                      $t(
                        "company_profile.company_tab.company_setup_update.form.invalid_msgs.detailed_industry_is_required"
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
                  class="k_prime_inp_select"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="
                   Country
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
                        "company_profile.company_tab.company_setup_update.form.invalid_msgs.country_headquater_is_required"
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
                  maxlength="4"
                  minlength="4"
                  @keypress="isNumber"
                  class="form-control k_inp_field"
                  :placeholder="
                    $t(
                      'company_profile.company_tab.company_setup_update.form.placeholder.year_of_incorporation'
                    )
                  "
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
                    v-if="v$.companyForm.incorporation_year.required.$invalid"
                    class="text-left fs-14"
                  >
                    {{
                      $t(
                        "company_profile.company_tab.company_setup_update.form.invalid_msgs.year_of_incorporation_is_required"
                      )
                    }}
                  </span>
                  <span
                    v-if="
                      v$.companyForm.incorporation_year.maxLengthValue.$invalid
                    "
                    class="text-left fs-14"
                  >
                    {{
                      $t(
                        "company_profile.company_tab.company_setup_update.form.invalid_msgs.year_must_be_4_digit"
                      )
                    }}
                  </span>
                  <span
                    v-if="
                      v$.companyForm.incorporation_year.minLengthValue.$invalid
                    "
                    class="text-left fs-14"
                  >
                    {{
                      $t(
                        "company_profile.company_tab.company_setup_update.form.invalid_msgs.year_atlest_4_digit"
                      )
                    }}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="input-group d-flex">
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
                        $t(
                          'company_profile.company_tab.company_setup_update.form.placeholder.phone_no'
                        )
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
                        Phone number is required
                      </span>
                      <span
                        v-if="
                          v$.companyForm.phonenumber.maxLengthValue.$invalid
                        "
                        class="text-left fs-14"
                      >
                        Phone Number must be 15 digit
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="btns_wrap">
            <button class="btn btn-light btn-set text-uppercase m-r-20">
              {{
                $t(
                  "company_profile.company_tab.company_setup_update.form.buttons.cancel"
                )
              }}
            </button>
            <button
              :disabled="isSubmitted"
              type="submit"
              class="btn btn-primary btn-set text-uppercase"
            >
              <div v-if="isSubmitted">
                <span class="spinner-border text-light" role="status"></span>
                Loading...
              </div>
              <span v-else>
                {{
                  $t(
                    "company_profile.company_tab.company_setup_update.form.buttons.create"
                  )
                }}</span
              >
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, numeric, minLength, maxLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import CommonService from "../../Services/CommonService";
import errorhandler from "../../utils/Error";
import Dropdown from "primevue/dropdown";
import { mapGetters } from "vuex";
import SignupService from "../../Services/SignupService";

export default {
  components: {
    Dropdown,
  },
  data() {
    return {
      valiImage: true,
      isSubmitted: false,
      defaultImg: "icons/cloud-upload.svg",
      country_flag: "",
      country_code: undefined,
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      numberPattern: /[0-9]/,
      value: null,
      companyForm: {
        auth_token: "",
        company: "",
        country_code: "",
        country: null,
        main_industry: null,
        sub_industry: null,
        phonenumber: null,
        corporation_legal_form: null,
        company_role: null,
        region: null,
        incorporation_year: null,
        client_logo: "",
        detailed_industry: null,
      },
    };
  },
  created() {
    console.log(this.defaultImg == "icons/cloud-upload.svg");
    this.getIndustryList();
    this.getLegalCoporation();
    this.getRoleInCompany();
    this.getRegions();
    this.getCountries();
  },

  computed: {
    ...mapGetters({
      industryLists: "mainIndustries",
      subIndustryLists: "subIndustries",
      detailedIndustryLists: "detailIndustries",
      countryLists: "allCountries",
      regionLists: "allRegion",
      ownRoleLists: "allRoles",
      legalCorpLists: "allLegalFormCorporation",
    }),
  },

  mounted() {
    this.$refs.focusInp.focus();
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
        phonenumber: {
          required,
          numeric,
          maxLengthValue: maxLength(15),
        },
        main_industry: { required },
        sub_industry: { required },
        detailed_industry: { required },
        company_role: { required },
        incorporation_year: {
          required,
          numeric,
          maxLengthValue: maxLength(4),
          minLengthValue: minLength(4),
        },
        corporation_legal_form: { required },
      },
    };
  },
  methods: {
    saveCompanyInfo() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        this.companyForm.auth_token = this.staffData.auth_token;
        this.companyForm.country_code = this.country_code;
        this.isSubmitted = true;
        SignupService.companyBasicInfo(this.companyForm)

          .then((res) => {
            if (res.data.status) {
              console.log("company_data 11 res added", res.data.data);
              this.getAllCompanies();

              this.formReset();
            } else {
              errorhandler(res);
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
    getAllCompanies() {
      this.$store.dispatch("getStaffsCompanies", {
        auth_token: this.staffData.auth_token,
      });
    },
    formReset() {
      this.v$.$reset();
      this.defaultImg = "icons/cloud-upload.svg";
      this.country_flag = "";
      this.country_code = "";
      this.companyForm = {
        auth_token: "",
        company: "",
        country: null,
        main_industry: null,
        sub_industry: null,
        corporation_legal_form: null,
        company_role: null,
        region: null,
        incorporation_year: null,
        client_logo: "",
        detailed_industry: null,
      };
    },
    isNumber(event) {
      let char = String.fromCharCode(event.keyCode);
      if (this.numberPattern.test(char)) return true;
      else event.preventDefault();
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      this.valiImage = true;
      const files = event.target.files;
      let $th = this;
      if (files != "undefined" && files.length > 0) {
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function (e) {
          var image = new Image();
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
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
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
      this.selectedCountryCode(+this.companyForm.country);
    },

    // get legal Corporation lists
    getLegalCoporation() {
      this.$store.dispatch("GET_ALL_LEGAL_FORM_CORPORATION");
    },

    // get role in company lists
    getRoleInCompany() {
      this.$store.dispatch("GET_ROLES");
    },

    // get regions lists
    getRegions() {
      this.$store.dispatch("GET_ALL_REGION");
    },

    // get country lists
    getCountries(id) {
      this.$store.dispatch("GET_COUNTRIES", id);
    },

    // get country code
    selectedCountryCode(id) {
      CommonService.getCountryCode({ country_id: id }).then((resp) => {
        if (resp.data.status) {
          this.country_flag = resp.data.data.image;
          this.country_code = resp.data.data.code;
          console.log(
            "country codes and flags",
            this.country_flag,
            this.country_code
          );
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.phone_main_wrap {
  width: 90%;
  float: right;
}
.cust_err {
  position: absolute;
  top: 100%;
}

.logo_holder1 {
  margin-right: 20px;
}
.form_container {
  background-color: #ffffff;
  padding: 20px 28px;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
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
  width: 10%;
  float: left;
  background-color: #ced4da;
  text-align: center;
}
.upload_image_wrapper {
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
  .logo_holder {
    width: 20%;
  }
  .logo_action_container {
    margin-left: 20px;
    .action_btns_wrap {
      padding-bottom: 10px;
    }
  }
}
</style>
