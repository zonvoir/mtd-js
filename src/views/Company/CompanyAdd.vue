<template>
  <div>
    <div class="form_container">
      <div class="">
        <form @submit.prevent="saveCompanyInfo" action="">
          <div class="upload_image_wrapper">
            <div class="logo_holder1">
              <div class="c_logo_container">
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
                <Multiselect
                  :placeholder="
                    $t(
                      'company_profile.company_tab.company_setup_update.form.placeholder.own_role_company'
                    )
                  "
                  class="form-control k_inp_field"
                  rules="required"
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
                <Multiselect
                  :placeholder="
                    $t(
                      'company_profile.company_tab.company_setup_update.form.placeholder.legal_form_corporation'
                    )
                  "
                  class="form-control k_inp_field"
                  rules="required"
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
                <select
                  class="form-control k_inp_field"
                  @change="onChangeMainIndustry"
                  @blur="v$.companyForm.main_industry.$touch"
                  v-model="companyForm.main_industry"
                  :class="{
                    'is-invalid': v$.companyForm.main_industry.$error,
                  }"
                >
                  <option :value="null" disabled selected>
                    {{
                      $t(
                        "company_profile.company_tab.company_setup_update.form.placeholder.main_industry"
                      )
                    }}
                  </option>
                  <option
                    v-for="mainInd in industryLists"
                    :key="'mainInd' + mainInd.value"
                    :value="mainInd.value"
                    :disabled="mainInd.disabled"
                  >
                    {{ mainInd.label }}
                  </option>
                </select>

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
                <select
                  class="form-control k_inp_field"
                  @change="onChangeSubIndustry"
                  @blur="v$.companyForm.sub_industry.$touch"
                  v-model="companyForm.sub_industry"
                  :class="{
                    'is-invalid': v$.companyForm.sub_industry.$error,
                  }"
                >
                  <option :value="null" disabled selected>
                    {{
                      $t(
                        "company_profile.company_tab.company_setup_update.form.placeholder.sub_industry"
                      )
                    }}
                  </option>
                  <option
                    v-for="subInd in subIndustryLists"
                    :key="'subINd' + subInd.value"
                    :value="subInd.value"
                    :disabled="subInd.disabled"
                  >
                    {{ subInd.label }}
                  </option>
                </select>

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
                <select
                  class="form-control k_inp_field"
                  @blur="v$.companyForm.detailed_industry.$touch"
                  v-model="companyForm.detailed_industry"
                  :class="{
                    'is-invalid': v$.companyForm.detailed_industry.$error,
                  }"
                >
                  <option :value="null" disabled selected>
                    {{
                      $t(
                        "company_profile.company_tab.company_setup_update.form.placeholder.detailed_industry"
                      )
                    }}
                  </option>
                  <option
                    v-for="detailInd in detailedIndustryLists"
                    :key="'subINd' + detailInd.value"
                    :value="detailInd.value"
                    :disabled="detailInd.disabled"
                  >
                    {{ detailInd.label }}
                  </option>
                </select>

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
                <select
                  class="form-control k_inp_field"
                  @change="onChangeRegion"
                  @blur="v$.companyForm.region.$touch"
                  v-model="companyForm.region"
                  :class="{
                    'is-invalid': v$.companyForm.region.$error,
                  }"
                >
                  <option :value="null" disabled selected>
                    {{
                      $t(
                        "company_profile.company_tab.company_setup_update.form.placeholder.region"
                      )
                    }}
                  </option>
                  <option
                    v-for="region in regionLists"
                    :key="'region' + region.value"
                    :value="region.value"
                    :disabled="region.disabled"
                  >
                    {{ region.label }}
                  </option>
                </select>

                <div
                  v-if="v$.companyForm.region.$error"
                  class="invalid-feedback text-left"
                >
                  <span
                    v-if="v$.companyForm.region.required.$invalid"
                    class="text-left fs-14"
                  >
                    {{
                      $t(
                        "company_profile.company_tab.company_setup_update.form.invalid_msgs.region_is_required"
                      )
                    }}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="k_form_group k_select_single">
                <select
                  class="form-control k_inp_field"
                  @blur="v$.companyForm.country.$touch"
                  @change="onChangeCountry"
                  v-model="companyForm.country"
                  :class="{
                    'is-invalid': v$.companyForm.country.$error,
                  }"
                >
                  <option :value="null" disabled selected>
                    {{
                      $t(
                        "company_profile.company_tab.company_setup_update.form.placeholder.country_headquater"
                      )
                    }}
                  </option>
                  <option
                    v-for="country in countryLists"
                    :key="'country' + country.value"
                    :value="country.value"
                    :disabled="country.disabled"
                  >
                    {{ country.label }}
                  </option>
                </select>

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
              <div class="wrap_phone_inp">
                <div class="k_form_group k_inp_number phone_field">
                  <div class="country_flag_wrap">
                    <img
                      v-if="country_flag"
                      :src="country_flag"
                      class="country_flag"
                      alt=""
                    />
                  </div>
                  <div v-if="country_code" class="country_code_wrap">
                    <span class="country_code">(+ {{ country_code }})</span>
                  </div>
                  <input
                    type="number"
                    maxlength="10"
                    minlength="10"
                    @keypress="isNumber"
                    class="form-control shift_number k_inp_field"
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
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="v$.companyForm.phonenumber.required.$invalid"
                      class="text-left fs-14"
                    >
                      Phone number is required
                    </span>
                    <span
                      v-if="v$.companyForm.phonenumber.maxLengthValue.$invalid"
                      class="text-left fs-14"
                    >
                      Phone Number must be 10 digit
                    </span>
                    <span
                      v-if="v$.companyForm.phonenumber.minLengthValue.$invalid"
                      class="text-left fs-14"
                    >
                      Phone Number at lest 10 digit
                    </span>
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
              <div
                v-if="isSubmitted"
                class="spinner-border text-light"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
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
import signupService from "../../Services/SignupService";
import Multiselect from "@vueform/multiselect";
import CommonService from "../../Services/CommonService";
import errorhandler from "../../utils/Error";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      valiImage: true,
      isSubmitted: false,
      defaultImg: "icons/cloud-upload.svg",
      country_flag: "",
      country_code: "",
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      industryLists: [],
      legalCorpLists: [],
      regionLists: [],
      ownRoleLists: [],
      subIndustryLists: [],
      detailedIndustryLists: [],
      numberPattern: /[0-9]/,
      // InCorpYearLists: ["2021"],
      countryLists: [],
      value: null,
      // options: ["Batman", "Robin", "Joker"],
      companyForm: {
        auth_token: "",
        company: "",
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
          maxLengthValue: maxLength(10),
          minLengthValue: minLength(10),
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
        region: { required },
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
        console.log("company data", this.companyForm);
        this.isSubmitted = true;
        signupService
          .setUpCompany(this.companyForm)
          .then((res) => {
            if (res.data.status) {
              console.log("company_data res", res.data.data);
              // this.$store.dispatch("getStaffsCompanies", res.data.data);
              this.$toast.success(res.data.message, {
                position: "bottom-left",
                duration: 3712,
              });
              this.formReset();
            } else {
              errorhandler(res, this);
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
      // this.$router.push({ name: "company-profile-edit" });
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
      console.log("seelcted Files", files);
      if (files != "undefined" && files.length > 0) {
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function (e) {
          var image = new Image();
          image.src = e.target.result;
          image.onload = function () {
            var height = this.height;
            var width = this.width;
            if (height === 100 && width === 100) {
              $th.uploadCompanyLogo(files[0]);
              return true;
            } else {
              $th.defaultImg = "icons/cloud-upload.svg";
              $th.valiImage = false;
              return false;
            }
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
        // $th.companyForm.client_logo = reader.result;
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
    // get detailed Industry lists
    getDetailedIndustryList() {
      CommonService.getAllDetailedIndustries(
        this.companyForm.sub_industry
      ).then((resp) => {
        if (resp.data.status) {
          for (var i = 0; i < resp.data.data.length; i++) {
            let detailIndus = {
              value: resp.data.data[i].id,
              label: resp.data.data[i].name,
            };
            this.detailedIndustryLists.push(detailIndus);
          }
          // this.detailedIndustryLists = resp.data.data;
          console.log("detailed industry", this.detailedIndustryLists);
        } else {
          this.detailedIndustryLists = [
            { value: 0, label: "No record found", disabled: true },
          ];
        }
      });
    },

    onChangeMainIndustry() {
      console.log("sub Industry", this.companyForm.main_industry);
      this.getSubIndustryList(this.companyForm.main_industry);
    },
    onChangeSubIndustry() {
      console.log("Detail Industry", this.companyForm.sub_industry);
      this.getDetailedIndustryList(this.companyForm.sub_industry);
    },
    onChangeRegion() {
      console.log("Detail Industry", this.companyForm.region);
      this.getCountries(this.companyForm.region);
    },
    onChangeCountry() {
      console.log("Detail Industry", this.companyForm.country);
      this.selectedCountryCode(+this.companyForm.country);
    },
    // get Sub Industry lists
    getSubIndustryList(id) {
      // console.log("sub Industry", this.companyForm.main_industry);
      CommonService.getAllSubIndustries(id).then((resp) => {
        if (resp.data.status) {
          this.subIndustryLists = [];
          for (var i = 0; i < resp.data.data.length; i++) {
            let subIndustery = {
              value: resp.data.data[i].id,
              label: resp.data.data[i].name,
            };
            this.subIndustryLists.push(subIndustery);
          }
          // this.subIndustryLists = resp.data.data;
          console.log("sub industry", this.subIndustryLists);
        } else {
          this.subIndustryLists = [
            // { value: 0, label: "No record found", disabled: true },
          ];
        }
      });
    },

    // get legal Corporation lists
    getLegalCoporation() {
      CommonService.getAllLegalFormCorporation().then((resp) => {
        if (resp.data.status) {
          for (var i = 0; i < resp.data.data.length; i++) {
            let legalcorp = {
              value: resp.data.data[i].id,
              label: resp.data.data[i].name,
            };
            this.legalCorpLists.push(legalcorp);
          }
        } else {
          this.legalCorpLists = [
            { value: 0, label: "No record found", disabled: true },
          ];
        }
      });
    },
    // get role in company lists
    getRoleInCompany() {
      CommonService.getAllOwnRoleInCompany().then((resp) => {
        if (resp.data.status) {
          for (var i = 0; i < resp.data.data.length; i++) {
            let roles = {
              value: resp.data.data[i].id,
              label: resp.data.data[i].name,
            };
            this.ownRoleLists.push(roles);
          }
        } else {
          this.ownRoleLists = [
            { value: 0, label: "No record found", disabled: true },
          ];
        }
      });
    },
    // get regions lists
    getRegions() {
      CommonService.getAllRegion().then((resp) => {
        if (resp.data.status) {
          for (var i = 0; i < resp.data.data.length; i++) {
            let regions = {
              value: resp.data.data[i].id,
              label: resp.data.data[i].region_name,
            };
            this.regionLists.push(regions);
          }
        } else {
          this.regionLists = [
            { value: 0, label: "No record found", disabled: true },
          ];
        }
      });
    },
    // get country lists
    getCountries(id) {
      CommonService.getAllCountry(id).then((resp) => {
        if (resp.data.status) {
          for (var i = 0; i < resp.data.data.length; i++) {
            let countries = {
              value: resp.data.data[i].country_id,
              label: resp.data.data[i].short_name,
            };
            this.countryLists.push(countries);
          }
          // this.countryLists = resp.data.data;
          console.log("country industry", this.countryLists);
        } else {
          this.countryLists = [
            { value: 0, label: "No record found", disabled: true },
          ];
        }
      });
    },
    // get country code
    selectedCountryCode(id) {
      console.log("get country id", id);
      CommonService.getCountryCode({ country_id: id }).then((resp) => {
        if (resp.data.status) {
          this.country_flag = resp.data.data.image;
          this.country_code = resp.data.data.code;
          console.log(
            "country codes and flags",
            this.country_flag,
            this.country_code
          );
        } else {
          // this.countryLists = [
          //   { value: 0, label: "No record found", disabled: true },
          // ];
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap_phone_inp {
  position: relative;
  .phone_field {
    width: 100%;
    .shift_number {
      padding-left: 155px !important;
    }
  }
  .codes_select {
    position: absolute;
    left: -3px;
    top: -3px;
  }
}
.logo_action_container1 {
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
  width: 30px;
  position: relative;
  top: 16%;
  left: 30%;
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
  position: relative;
  top: 21%;
  left: 20%;
}
.country_flag_wrap {
  position: absolute;
  top: -2px;
  left: -4px;
  background: #edf1f7 !important;
  border-radius: 4px;
  width: 75px;
  height: 46px;
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
