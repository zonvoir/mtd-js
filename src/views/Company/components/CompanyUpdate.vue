<template>
  <div>
    <!-- {{ companyProfile }} -->
    <div class="comapny_profile_header d-flex m-b-32">
      <div class="company_prof_info">
        <div class="img_wrapper" @click="onPickFile">
          <img
            v-if="companyForm.client_logo"
            :src="companyForm.client_logo"
            class="c_logo_wrapper"
            alt=""
          />
          <span v-else class="default_logo" style="background: #0aca8a">
            <b>{{ formatMemberName(companyForm.company) }}</b>
          </span>
          <input
            type="file"
            style="display: none"
            ref="fileInput"
            accept="image/*"
            @change="onFilePicked"
          />
        </div>
        <div class="c_details_wrapper">
          <div class="d-flex align-items-center">
            <div class="d-block m-r-10">
              <input
                type="text"
                class="form-control k_input_update_company m-r-10"
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
            <div class="d-block">
              <input
                type="text"
                maxlength="4"
                minlength="4"
                @keypress="isNumber"
                class="form-control k_input_update_company"
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
          <div class="d-inline-flex">
            <!-- {{ companyForm.country }} -->
            <div class="d-block m-r-10">
              <Dropdown
                class="borderless_select country"
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
            <div class="d-block">
              <div class="input-group">
                <div class="phone_main_wrap">
                  <div class="w-100">
                    <span v-if="companyForm.country_code" class="country_code">
                      (+{{ companyForm.country_code }})
                    </span>
                    <span v-else class="country_code"> (+91) </span>
                    <input
                      class="form-control k_input_phone_number cus_ph_inp"
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
        </div>
      </div>
      <div class="c_actions m-l-auto">
        <button
          type="button"
          @click="saveCompanyInfo"
          class="btn btn-primary btn-set text-uppercase"
        >
          <span class="fs-14 fw-700">{{
            $t("company_profile.company_tab.company_edit.buttons.save")
          }}</span>
        </button>
      </div>
    </div>
    <!-- compnay details sec start -->
    <div class="c_page_title m-b-21">
      <h4 class="m-b-0 fs-18 fw-700 text-heading">
        {{
          $t(
            "company_profile.company_tab.company_details.main_headings.About_Company"
          )
        }}
      </h4>
    </div>
    <div class="company_basic_info m-b-15">
      <div class="row">
        <div class="col-lg-3 m-b-26">
          <h4 class="c_base_head">
            {{
              $t(
                "company_profile.company_tab.company_details.About_Company_lables.Main_Industry"
              )
            }}
            <span class="m-l-9">
              <img src="icons/info.svg" alt="" class="kw-15" />
            </span>
          </h4>
          <!-- <h6 class="c_base_value">Services</h6> -->
          <div class="k_form_group">
            <Dropdown
              class="borderless_select"
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
        <div class="col-lg-3 m-b-26">
          <h6 class="c_base_head">
            {{
              $t(
                "company_profile.company_tab.company_details.About_Company_lables.Sub_Industry"
              )
            }}
            <span class="m-l-9">
              <img src="icons/info.svg" alt="" class="kw-15" />
            </span>
          </h6>
          <!-- <h6 class="c_base_value">Department</h6> -->
          <div class="k_form_group">
            <Dropdown
              class="borderless_select"
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
        <div class="col-lg-3 m-b-26">
          <h6 class="c_base_head">
            {{
              $t(
                "company_profile.company_tab.company_details.About_Company_lables.Detailed_Industry"
              )
            }}
            <span class="m-l-9">
              <img src="icons/info.svg" alt="" class="kw-15" />
            </span>
          </h6>
          <!-- <h6 class="c_base_value">Development Web Services</h6> -->
          <div class="k_form_group">
            <Dropdown
              class="borderless_select"
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
        <div class="col-lg-3 m-b-26">
          <h6 class="c_base_head">
            {{
              $t(
                "company_profile.company_tab.company_details.About_Company_lables.Legal_Form_of_Corporation"
              )
            }}
          </h6>
          <!-- <h6 class="c_base_value">Public Limited Company</h6> -->
          <div class="k_form_group">
            <Dropdown
              class="borderless_select"
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
                v-if="v$.companyForm.corporation_legal_form.required.$invalid"
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
        <div class="col-lg-3 m-b-26">
          <h6 class="c_base_head">
            {{
              $t(
                "company_profile.company_tab.company_details.About_Company_lables.Region"
              )
            }}
          </h6>
          <!-- <h6 class="c_base_value">Regional</h6> -->
          <div class="k_form_group">
            <Dropdown
              class="borderless_select"
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
        <div class="col-lg-3 m-b-26">
          <h6 class="c_base_head">
            {{
              $t(
                "company_profile.company_tab.company_details.About_Company_lables.Revenu_Total"
              )
            }}
          </h6>
          <h6 class="c_base_value">
            <span>
              {{
                companyForm.currency_symbol ? companyForm.currency_symbol : "$"
              }}
            </span>
            {{ companyForm.total_revenue }}
          </h6>
        </div>
        <div class="col-lg-3 m-b-26">
          <h4 class="c_base_head">
            {{
              $t(
                "company_profile.company_tab.company_details.About_Company_lables.Currency"
              )
            }}
            <span class="m-l-9">
              <img src="icons/info.svg" alt="" class="kw-15" />
            </span>
          </h4>
          <Dropdown
            class="borderless_select"
            optionLabel="label"
            optionValue="value"
            placeholder="
                   Currency
                  "
            :options="currencyLists"
            @change="onChangeCurrency"
            v-model="companyForm.currency"
          />
        </div>
        <div class="col-lg-3 m-b-26">
          <CustomRateModal>
            <template v-slot:exchange-rate-button>
              <a class="primary-link link_edit">{{
                $t("company_profile.company_tab.company_details.buttons.edit")
              }}</a>
            </template>
          </CustomRateModal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, numeric, minLength, maxLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Dropdown from "primevue/dropdown";
import { mapGetters } from "vuex";
import CommonService from "../../../Services/CommonService";
import CustomRateModal from "./CustomRateModal.vue";
import errorhandler from "../../../utils/Error";
import {
  getFirstLetter,
  setRandomBackground,
} from "../../../utils/commonHelperFuntions";
export default {
  props: {
    companyProfile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      defaultImg: "",
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      numberPattern: /[0-9]/,
      companyForm: {
        company: "",
        country_code: "",
        currency: "",
        company_id: null,
        country: null,
        main_industry: null,
        sub_industry: null,
        phonenumber: null,
        corporation_legal_form: null,
        region: null,
        incorporation_year: null,
        client_logo: "",
        detailed_industry: null,
      },
    };
  },

  components: {
    Dropdown,
    CustomRateModal,
  },

  computed: {
    ...mapGetters({
      industryLists: "mainIndustries",
      subIndustryLists: "subIndustries",
      detailedIndustryLists: "detailIndustries",
      legalCorpLists: "allLegalFormCorporation",
      countryLists: "allCountries",
      regionLists: "allRegion",
      companyId: "activeCompany",
      currencyLists: "allCurrency",
    }),
  },
  updated() {
    this.companyForm = this.companyProfile;
  },
  created() {
    this.companyForm = this.companyProfile;
    this.$store.dispatch("GET_ALL_CURRENCY");
    this.getIndustryList();
    this.getLegalCoporation();
    this.getRoleInCompany();
    this.getRegions();
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
        incorporation_year: {
          required,
          numeric,
          maxLengthValue: maxLength(4),
          minLengthValue: minLength(4),
        },
        // region: { required },
        corporation_legal_form: { required },
      },
    };
  },
  methods: {
    openCustomModal() {
      this.modal.show();
    },
    // get member name format
    formatMemberName(str) {
      return getFirstLetter(str);
    },
    // get member name format
    getBgColor() {
      return setRandomBackground();
    },
    isValidUrl(urlString) {
      if (urlString.startsWith("https://") || urlString.startsWith("http://")) {
        this.companyForm.client_logo = null;
      } else {
        console.log("unvalid", this.defaultImg);
        this.companyForm.client_logo = this.defaultImg;
      }
    },
    saveCompanyInfo() {
      this.v$.companyForm.$touch();
      if (!this.v$.companyForm.$invalid) {
        this.companyForm.auth_token = this.staffData.auth_token;
        if (this.companyForm.client_logo != null) {
          this.isValidUrl(this.companyForm.client_logo);
        }
        this.isSubmitted = true;
        this.$store
          .dispatch("UPDATE_CAMPNAY_DATA", this.companyForm)
          .then((res) => {
            if (res.data.status) {
              localStorage.removeItem("selected_company");
              localStorage.setItem(
                "selected_company",
                res.data.data.company_id
              );
              this.getAllCompanies();
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
    isNumber(event) {
      // console.log(event);
      let char = String.fromCharCode(event.keyCode);
      if (this.numberPattern.test(char)) return true;
      else event.preventDefault();
    },
    // upload company logo
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
      this.$store.dispatch("GET_MAIN_INDUSTRIES").then((res) => {
        if (res.data.status) {
          this.onChangeMainIndustry();
        }
      });
    },

    onChangeMainIndustry() {
      this.$store
        .dispatch("GET_SUB_INDUSTRIES", this.companyForm.main_industry)
        .then((res) => {
          if (res.data.status) {
            this.onChangeSubIndustry();
          }
        });
    },

    onChangeSubIndustry() {
      this.$store.dispatch(
        "GET_DEATAIL_INDUSTRIES",
        this.companyForm.sub_industry
      );
    },

    onChangeRegion() {
      this.getCountries(this.companyForm.region);
      // this.companyForm.country_code = "";
      this.companyForm.country = "";
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
      this.$store.dispatch("GET_ALL_REGION").then((res) => {
        if (res.data.status) {
          this.getCountries(this.companyForm.region);
        }
      });
    },

    // get country lists
    getCountries(id) {
      this.$store.dispatch("GET_COUNTRIES", id);
    },

    // get country code
    selectedCountryCode(id) {
      CommonService.getCountryCode({ country_id: id }).then((resp) => {
        if (resp.data.status) {
          this.companyForm.country_code = resp.data.data.code;
          console.log("country codes", this.companyForm.country_code);
        }
      });
    },

    onChangeCurrency() {},
  },
};
</script>

<style lang="scss" scoped>
.default_logo {
  justify-content: center;
  align-content: center;
  display: inline-flex;
  line-height: 4rem;
  width: 4rem;
  height: 4rem;
  border-radius: 4px;
  b {
    font-weight: bold;
    font-size: 22px;
    line-height: 4rem;
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;
  }
}

.place_holder {
  &::placeholder {
    font-size: 14px;
    font-weight: 500;
    color: #8f9bb3;

    cursor: pointer;
    opacity: 1; /* Firefox */
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    font-size: 14px;
    font-weight: 500;
    color: #8f9bb3;

    cursor: pointer;
  }

  &::-ms-input-placeholder {
    /* Microsoft Edge */
    font-size: 14px;
    font-weight: 500;
    color: #8f9bb3;

    cursor: pointer;
  }
}
.k_form_group {
  margin-bottom: 0;
}
.k_input_phone_number {
  font-size: 18px !important;
  line-height: 22px !important;
  color: #000000 !important;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
  padding: 10px 5px;
  width: 100%;

  //   width: 181px;
  height: 40px;
  border-radius: 4px !important;

  background-color: transparent;
  @extend .place_holder;
  &:hover {
    outline: 1px solid #e4e9f2;
    outline-offset: 0px;
  }
  &.is-invalid {
    outline: 1px solid #db2c66;
    outline-offset: 0px;
    border-radius: 0;
    border: 0;
    box-shadow: none;
  }
  &:focus {
    outline: 1px solid #e4e9f2;
    outline-offset: 0px;
    border-radius: 0;
    box-shadow: none;
    background-color: transparent;
  }
}
.k_input_update_company {
  font-size: 22px;
  font-weight: 700;
  color: #222b45;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
  padding: 10px 5px;
  width: 100%;
  height: 40px;
  border-radius: 4px !important;
  background-color: transparent;
  @extend .place_holder;
  &:hover {
    outline: 1px solid #e4e9f2;
    outline-offset: 0px;
  }
  &.is-invalid {
    outline: 1px solid #db2c66;
    outline-offset: 0px;
    border-radius: 0;
    border: 0;
    box-shadow: none;
  }

  &:focus {
    width: auto;
    outline: 1px solid #e4e9f2;
    outline-offset: 0px;
    border-radius: 0;
    box-shadow: none;
    background-color: transparent;
  }
}
.c_base_head {
  font-size: 14px;
  font-weight: 500;
  color: #8f9bb3;
  margin-bottom: 2px;
  cursor: pointer;
}
.c_base_value {
  font-size: 15px;
  font-weight: 500;
  color: #222b45;
  margin-bottom: 0;
  padding-top: 13px;
}
.company_prof_info {
  display: inline-flex;
  .c_details_wrapper {
    h4 {
    }
  }
  .img_wrapper {
    cursor: pointer;
    margin-right: 20px;
  }
}
.c_logo_wrapper {
  width: 64px;
  height: 64px;
}
</style>
