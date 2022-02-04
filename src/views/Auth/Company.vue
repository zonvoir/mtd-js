<template>
  <div>
    <div class="register_auth_wrapper">
      <div class="">
        <div class="">
          <div class="main-heading-wrap text-center">
            <h2 class="main-heading">Setup your company</h2>
          </div>
        </div>
        <div class="form-wrapper">
          <form @submit.prevent="saveCompanyInfo" action="">
            <div class="upload_image_wrapper">
              <div class="logo_holder">
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
                    upload logo
                  </button>
                  <button
                    @click="removeImage"
                    type="button"
                    class="btn k_btnfs14_w700 btn-basic-3"
                  >
                    Remove
                  </button>
                </div>
                <div class="hint_message_wrap">
                  <p v-if="valiImage" class="text-secodary m-b-0">
                    Images should be 100 x 100 px as a png or jpeg file
                  </p>
                  <p v-else class="text-danger m-b-0">
                    Images Must be 100 x 100 px as a png or jpeg file
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
                    placeholder="Company Name"
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
                      Company is required
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="k_form_group k_select_single">
                  <Multiselect
                    placeholder="Own Role in Company"
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
                      Role in company is required
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="k_form_group k_select_single">
                  <Multiselect
                    placeholder="Legal from of corporation"
                    class="form-control k_inp_field"
                    rules="required"
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
                      Corporation legal form is required
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="k_form_group k_select_single">
                  <!-- @input="getDetailedIndustryList()" -->
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
                      Select Main Industry
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
                  <!-- <Multiselect
                    placeholder="Main Industry"
                    class="form-control k_inp_field"
                    rules="required"
                    @change="onChangeMainIndustry"
                    :options="industryLists"
                    @blur="v$.companyForm.main_industry.$touch"
                    v-model="companyForm.main_industry"
                    :class="{
                      'is-invalid': v$.companyForm.main_industry.$error,
                    }"
                  /> -->
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
                      Select sub Industry
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
                  <!-- <Multiselect
                    placeholder="Sub Industry"
                    class="form-control k_inp_field"
                    rules="required"
                    @input="getDetailedIndustryList()"
                    :options="subIndustryLists"
                    @blur="v$.companyForm.sub_industry.$touch"
                    v-model="companyForm.sub_industry"
                    :class="{
                      'is-invalid': v$.companyForm.sub_industry.$error,
                    }"
                  /> -->
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
                  <select
                    class="form-control k_inp_field"
                    @blur="v$.companyForm.detailed_industry.$touch"
                    v-model="companyForm.detailed_industry"
                    :class="{
                      'is-invalid': v$.companyForm.detailed_industry.$error,
                    }"
                  >
                    <option :value="null" disabled selected>
                      Select Detailed Industry
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
                      Detailed industry is required
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
                      Select Region
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
                      Region is required
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
                      Select Country
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
                      Country is required
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="k_form_group">
                  <input
                    type="text"
                    class="form-control k_inp_field"
                    placeholder="Incorporation year"
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
                      v-if="v$.companyForm.incorporation_year.required.$invalid"
                      class="text-left fs-14"
                    >
                      Incorporation year is required
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
                    <div class="country_code_wrap">
                      <!-- <input type="text" :value="country_code" readonly /> -->
                      <span v-if="country_code" class="country_code_val"
                        >(+{{ country_code }})</span
                      >
                      <span v-else class="country_code_val">(+ 91 )</span>
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
                        v-if="
                          v$.companyForm.phonenumber.maxLengthValue.$invalid
                        "
                        class="text-left fs-14"
                      >
                        Phone Number must be 10 digit
                      </span>
                      <span
                        v-if="
                          v$.companyForm.phonenumber.minLengthValue.$invalid
                        "
                        class="text-left fs-14"
                      >
                        Phone Number at least 10 digit
                      </span>
                    </div>
                  </div>
                </div>
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
                <span v-else> Create Company </span>
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
    <!-- <Toast /> -->
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    ref="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header conf_header">
          <div class="header_wrap">
            <div class="m-r-20">
              <img src="K_Icons/info.svg" alt="" />
            </div>
            <div class="tittle">
              <h5 class="m-b-0 terms_title">confidential information!</h5>
            </div>
          </div>
          <!-- <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5> -->
        </div>
        <div class="modal-body confidencil_msg_body">
          <div class="terms_wrapper">
            <p class="temrs_para">
              The information is confidential, privileged and only for the
              information of the intended recipient and may not be used,
              published or redistributed.It is a long established fact that a
              reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).The
              information is confidential, privileged and only for the
              information of the intended recipient and may not be used,
              published or redistributed.It is a long established fact that a
              reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).The
              information is confidential, privileged and only for the
              information of the intended recipient and may not be used,
              published or redistributed.It is a long established fact that a
              reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).The
              information is confidential, privileged and only for the
              information of the intended recipient and may not be used,
              published or redistributed.It is a long established fact that a
              reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).The
              information is confidential, privileged and only for the
              information of the intended recipient and may not be used,
              published or redistributed.It is a long established fact that a
              reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).The
              information is confidential, privileged and only for the
              information of the intended recipient and may not be used,
              published or redistributed.It is a long established fact that a
              reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).The
              information is confidential, privileged and only for the
              information of the intended recipient and may not be used,
              published or redistributed.It is a long established fact that a
              reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).The
              information is confidential, privileged and only for the
              information of the intended
            </p>
          </div>
        </div>
        <div class="modal-footer modal_footer">
          <form action="">
            <div class="k_form_group">
              <div class="check_box_wrapper">
                <label class="k_checkbox check_lable">
                  I agree with the
                  <a
                    target="_blank"
                    class="custom-link"
                    href="https://www.w3schools.com"
                    >Terms of Service!</a
                  >
                  <input
                    type="checkbox"
                    v-model="termsCondtionForm.terms_service"
                    checked="checked"
                  />

                  <span class="checkmark"></span>
                </label>
              </div>
            </div>

            <div class="k_form_group">
              <div class="check_box_wrapper">
                <label class="k_checkbox check_lable">
                  I have read and accept the
                  <a
                    target="_blank"
                    class="custom-link"
                    href="https://www.w3schools.com"
                    >Privacy Policy!</a
                  >
                  <input
                    type="checkbox"
                    v-model="termsCondtionForm.privacy_policy"
                    checked="checked"
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
            <div class="d-grid">
              <button
                @click="acceptTermsCondtions"
                data-bs-dismiss="modal"
                :disabled="
                  !termsCondtionForm.privacy_policy ||
                  !termsCondtionForm.terms_service
                "
                type="button"
                class="btn k_btn_block btn-block text-uppercase btn-primary"
              >
                I Agree
              </button>
            </div>
          </form>
          <!-- <button type="button" class="btn btn-primary">Understood</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, numeric, minLength, maxLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Multiselect from "@vueform/multiselect";
import CommonService from "../../Services/CommonService";
// import Toast from "../../components/Shared/Toast.vue";
import SignupService from "../../Services/SignupService";
import { Modal } from "bootstrap";
import errorhandler from "../../utils/Error";

export default {
  components: {
    Multiselect,
    // Toast,
  },
  data() {
    return {
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
      industryLists: [],
      legalCorpLists: [],
      regionLists: [],
      ownRoleLists: [],
      subIndustryLists: [],
      detailedIndustryLists: [],
      // InCorpYearLists: ["2021"],
      countryLists: [],
      value: null,
      modal: null,
      // options: ["Batman", "Robin", "Joker"],
      countryCodes: [
        // {
        //   name: "german",
        //   icon: "K_Icons/flag1.svg",
        // },
      ],
      termsCondtionForm: {
        privacy_policy: false,
        terms_service: false,
      },
      companyForm: {
        auth_token: "",
        company: "",
        country: null,
        main_industry: null,
        country_code: "",
        sub_industry: null,
        corporation_legal_form: null,
        company_role: null,
        region: null,
        is_main: "1",
        phonenumber: null,
        incorporation_year: null,
        client_logo: "",
        detailed_industry: null,
      },
    };
  },

  mounted() {
    this.modal = new Modal(this.$refs.staticBackdrop);
    if (
      localStorage.getItem("bWFpbCI6Inpvb") != null ||
      sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") != null
    ) {
      this.modal.show();
    }
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
      } else {
        this.$router.push({ name: "signup-company" }); // now 3f
      }
    }
    // now 3f

    //  else {
    //   console.log("ejejke");
    //   // if (
    //   //   localStorage.getItem("bWFpbCI6Inpvb") == undefined ||
    //   //   localStorage.getItem("bWFpbCI6Inpvb") == null ||
    //   //   localStorage.getItem("bWFpbCI6Inpvb") == ""
    //   // ) {
    //   this.$router.push({ name: "signup-signin" });
    //   // }
    // }

    this.checkCompany();
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
      // $th = this,
      companyForm: {
        company: { required },
        country: { required },
        phonenumber: {
          required,
          numeric,
          maxLengthValue: maxLength(15),
          minLengthValue: minLength(10),
        },
        main_industry: { required },
        sub_industry: { required },
        detailed_industry: { required },
        company_role: { required },
        incorporation_year: { required },
        region: { required },
        corporation_legal_form: { required },
      },
    };
  },
  beforeUnmount() {
    this.modal.hide();
  },
  unmounted() {
    console.log("vishal from unmounted", this.modal);
    this.modal.hide();
  },
  methods: {
    visRedirect() {
      // this.modal.hide();
      this.$router.push({ name: "signup-signin" });
    },
    saveCompanyInfo() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        this.companyForm.auth_token = this.staffData.auth_token;
        this.companyForm.country_code = this.country_code;
        // if (this.companyForm.phonenumber && this.country_code) {
        //   this.codeWithNumber =
        //     "(+" + this.country_code + ")" + this.companyForm.phonenumber;
        // }
        // let data = {
        //   ...this.companyForm,
        // };
        // data.phonenumber = this.codeWithNumber;
        console.log("company data", this.companyForm);
        this.isSubmitted = true;
        SignupService.setUpCompany(this.companyForm)
          .then((response) => {
            if (response.data.status) {
              console.log("company Infomation", response.data.data);
              this.$store.dispatch("getCompanyInfoDetails", response.data.data);
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
      this.v$.$reset();
      this.country_flag = "";
      this.country_code = "";
      this.companyForm = {
        company: "",
        country: null,
        main_industry: null,
        sub_industry: null,
        corporation_legal_form: null,
        company_role: null,
        region: null,
        phonenumber: "",
        incorporation_year: null,
        client_logo: "",
        detailed_industry: null,
      };
      if (localStorage.getItem("bWFpbCI6Inpvb") != null) {
        this.staffData.is_company_setup = true;
        localStorage.setItem("bWFpbCI6Inpvb", JSON.stringify(this.staffData));
        this.$router.push({ name: "Dashboard" });
      } else {
        this.$router.push({ name: "signup-signin" });
      }
    },
    showModal() {
      this.modal.show();
    },
    acceptTermsCondtions() {
      this.modal.hide();
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
      // let file = files[0];
      let $th = this;
      console.log("seelcted Files", files);
      if (files != "undefined" && files.length > 0) {
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function (e) {
          var image = new Image(); //Set the Base64 string return from FileReader as source.
          image.src = e.target.result;
          // console.log(image.height, image.width);
          image.onload = function () {
            //Determine the Height and Width.
            var height = this.height;
            var width = this.width;
            if (height === 100 && width === 100) {
              // $th.valiImage = true;
              // $th.$refs.uploader.validate();
              $th.uploadCompanyLogo(files[0]);
              return true;
            } else {
              $th.defaultImg = "icons/cloud-upload.svg";
              $th.valiImage = false;
              // $th.$refs.uploader.validate();
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

    checkCompany() {
      if (this.staffData != null) {
        SignupService.checkCompany({
          auth_token: this.staffData.auth_token,
        }).then((resp) => {
          if (resp.data.status) {
            console.log("chack for company is setup or not");
            this.$router.push({ name: "Dashboard" });
          }
        });
      }
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
    onChangeCountry() {
      console.log("Detail Industry", this.companyForm.country);
      this.selectedCountryCode(+this.companyForm.country);
    },
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
.country_flag {
  width: 30px;
  position: relative;
  top: 20%;
  left: 14%;
}
.country_code_wrap {
  position: relative;
  top: 10px;
  left: 20px;
  background: transparent !important;
}
.country_code_val {
  font-style: 500;
  font-size: 16px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 17%;
  left: 7%;
}
.country_flag_wrap {
  position: absolute;
  top: -3px;
  left: -4px;
  background: #edf1f7 !important;
  border-radius: 4px;
  width: 40px;
  height: 46px;
}
.confidencil_msg_body {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 79.69%,
    #ffffff 100%
  );
  border-radius: 4px;
}
.terms_wrapper {
  // padding: 17px 34px 34px 34px;
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
