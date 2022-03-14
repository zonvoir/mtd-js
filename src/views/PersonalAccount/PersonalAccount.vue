<template>
  <div>
    <div class="member_container">
      <div class="d-flex align-items-center">
        <div class="view_title_wrap pb-15">
          <div class="page_title_wrap">
            <div class="">
              <h4 class="view_title">
                {{ $t("personal_account.personal_account") }}
              </h4>
            </div>
          </div>
        </div>
        <div class="search_wrap m-l-auto">
          <div class="k_form_group k_lang k_select_single">
            <Dropdown
              class="k_prime_inp_select"
              optionLabel="label"
              optionValue="value"
              placeholder="
                    Select Language
                  "
              v-model="selectedLanguage"
              @change="onChangeLanguage"
              :options="laguage"
            />
          </div>
        </div>
      </div>
      <div class="overview_container">
        <div class="form_container">
          <div class="">
            <h4 class="form_title">
              {{ $t("personal_account.personal_account") }}
            </h4>
          </div>

          <form @submit.prevent="savePersonalInfo" action="">
            <div class="upload_image_wrapper">
              <div class="logo_holder1">
                <div @click="onPickFile" class="c_logo_container">
                  <img
                    :src="
                      personalAccount.profile
                        ? personalAccount.profile
                        : 'icons/cloud-upload.svg'
                    "
                    class="upload_logo"
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
                    class="btn k_btnfs14_w700 btn-primary text-upercase m-r-20"
                  >
                    {{ $t("personal_account.form.buttons.upload_picture") }}
                  </button>
                  <button
                    @click="removeImage"
                    type="button"
                    class="btn k_btnfs14_w700 text-upercase btn-basic-3"
                  >
                    {{ $t("personal_account.form.buttons.remove") }}
                  </button>
                </div>
                <div class="hint_message_wrap">
                  <p class="text-secodary m-t-10">
                    {{ $t("personal_account.form.invalid_msgs.image_hint") }}
                  </p>
                </div>
              </div>
            </div>
            <!-- basic user info -->
            <div class="row">
              <div class="col-lg-6">
                <div class="k_form_group">
                  <input
                    type="text"
                    name="firstName"
                    :placeholder="
                      $t('personal_account.form.placeholder.firstname')
                    "
                    class="form-control k_inp_field"
                    @blur="v$.personalAccount.firstname.$touch"
                    v-model.trim="personalAccount.firstname"
                    :class="{
                      'is-invalid': v$.personalAccount.firstname.$error,
                    }"
                  />
                  <span
                    v-if="v$.personalAccount.firstname.$error"
                    class="invalid-feedback text-left"
                  >
                    {{
                      $t(
                        "personal_account.form.invalid_msgs.First_Name_is_required"
                      )
                    }}
                  </span>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="k_form_group">
                  <input
                    type="text"
                    name="lastName"
                    class="form-control k_inp_field"
                    :placeholder="
                      $t('personal_account.form.placeholder.lastname')
                    "
                    @blur="v$.personalAccount.lastname.$touch"
                    v-model.trim="personalAccount.lastname"
                    :class="{
                      'is-invalid': v$.personalAccount.lastname.$error,
                    }"
                  />
                  <span
                    v-if="v$.personalAccount.lastname.$error"
                    class="invalid-feedback text-left"
                  >
                    {{
                      $t(
                        "personal_account.form.invalid_msgs.Lastname_is_required"
                      )
                    }}
                  </span>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="k_form_group">
                  <input
                    type="text"
                    name="Username"
                    class="form-control k_inp_field"
                    :placeholder="
                      $t('personal_account.form.placeholder.username')
                    "
                    @blur="v$.personalAccount.username.$touch"
                    v-model.trim="personalAccount.username"
                    :class="{
                      'is-invalid': v$.personalAccount.username.$error,
                    }"
                  />
                  <span
                    v-if="v$.personalAccount.username.$error"
                    class="invalid-feedback text-left"
                  >
                    {{
                      $t(
                        "personal_account.form.invalid_msgs.Username_is_required"
                      )
                    }}
                  </span>
                </div>
              </div>
              <div class="com-lg-12">
                <div class="k_form_group">
                  <textarea
                    placeholder="Description"
                    class="form-control k_inp_field"
                    rows="3"
                    v-model.trim="personalAccount.description"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="border-top-1"></div>
            <h4 class="form_title">
              {{ $t("personal_account.form.labels.email") }}
            </h4>
            <div class="eamil_edit_wrap m-b-20">
              <div v-if="primary_email" class="d-flex align-items-center">
                <p class="m-b-0 primary_mail">
                  {{ $t("personal_account.form.primary_email_hint")
                  }}<strong class="p-l-10 mail_val">
                    {{ personalAccount.email }}</strong
                  >
                </p>
                <button
                  @click="primary_email = !primary_email"
                  type="button"
                  class="
                    btn
                    m-l-auto
                    btn-light
                    set_btn_width
                    btn-set
                    text-upercase
                  "
                >
                  {{ $t("personal_account.form.buttons.change") }}
                </button>
              </div>

              <!-- update primary email -->
              <div v-else class="">
                <div class="remove_mail_wrap">
                  <div class="">
                    <div class="k_form_group">
                      <input
                        type="email"
                        :placeholder="
                          $t('personal_account.form.placeholder.email')
                        "
                        @blur="v$.personalAccount.email.$touch"
                        v-model.trim="personalAccount.email"
                        class="form-control alt_email_inp k_inp_field"
                        :class="{
                          'is-invalid': v$.personalAccount.email.$error,
                        }"
                      />
                      <div
                        v-if="v$.personalAccount.email.$errors"
                        class="invalid-feedback text-left"
                      >
                        <span
                          class="text-left fs-14"
                          v-if="v$.personalAccount.email.required.$invalid"
                          >{{
                            $t(
                              "personal_account.form.invalid_msgs.Email_is_required"
                            )
                          }}</span
                        >
                        <span
                          class="text-left fs-14"
                          v-if="v$.personalAccount.email.email.$invalid"
                          >{{
                            $t(
                              "personal_account.form.invalid_msgs.Email_is_invalid"
                            )
                          }}</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="m-l-auto">
                    <button
                      @click="updateemail"
                      type="button"
                      class="
                        btn
                        m-l-auto
                        btn-primary
                        set_btn_width
                        btn-set
                        text-upercase
                      "
                    >
                      {{ $t("personal_account.form.buttons.add") }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- remove Email -->

              <div>
                <div
                  class="remove_mail_wrap"
                  v-for="(mail, idx) in personalAccount.alternate_emails"
                  :key="mail"
                >
                  <div class="">
                    <div class="removeable_email m-b-10">
                      <strong class="p-l-10 mail_val">{{ mail }} </strong>
                    </div>
                  </div>
                  <div class="m-l-auto">
                    <button
                      v-if="mail"
                      @click="removeEmail(idx)"
                      type="button"
                      class="
                        btn
                        m-l-auto
                        btn-light
                        set_btn_width
                        btn-set
                        text-upercase
                      "
                    >
                      {{ $t("personal_account.form.buttons.remove") }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Add New Email -->
              <div v-if="add_email" class="">
                <div class="remove_mail_wrap">
                  <div class="">
                    <div class="k_form_group">
                      <input
                        type="email"
                        :placeholder="
                          $t('personal_account.form.placeholder.email')
                        "
                        @blur="v$.newmail.$touch"
                        v-model.trim="newmail"
                        class="form-control alt_email_inp k_inp_field"
                        :class="{
                          'is-invalid': v$.newmail.$error,
                        }"
                      />
                      <div
                        v-if="v$.newmail.$errors"
                        class="invalid-feedback text-left"
                      >
                        <span
                          class="text-left fs-14"
                          v-if="v$.newmail.$errors"
                          >{{
                            $t(
                              "personal_account.form.invalid_msgs.Email_is_invalid"
                            )
                          }}</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="m-l-auto d-inline-flex">
                    <button
                      @click="addEmail(newmail)"
                      type="button"
                      :disabled="v$.newmail.$invalid"
                      class="
                        btn
                        m-l-auto
                        btn-primary
                        set_btn_width
                        btn-set
                        m-r-8
                        text-upercase
                      "
                    >
                      {{ $t("personal_account.form.buttons.add") }}
                    </button>
                    <button
                      @click="add_email = !add_email"
                      type="button"
                      class="
                        btn
                        m-l-auto
                        btn-light
                        set_btn_width
                        btn-set
                        text-upercase
                      "
                    >
                      {{ $t("personal_account.form.buttons.cancel") }}
                    </button>
                  </div>
                </div>
              </div>
              <div v-else class="page_link_wrap">
                <a @click="addNewEmail" class="page_link"
                  >{{ $t("personal_account.form.buttons.add_email") }}
                </a>
              </div>
            </div>
            <!-- password section start -->
            <div class="border-top-1"></div>
            <div class="d-flex align-items-center">
              <h4 class="form_title">
                {{ $t("personal_account.form.labels.password") }}
              </h4>
              <div class="m-l-auto">
                <button
                  v-if="updatePsw"
                  @click="updatePsw = !updatePsw"
                  type="button"
                  class="
                    btn
                    mb-0
                    text-right
                    btn-light
                    set_btn_width
                    btn-set
                    text-upercase
                  "
                >
                  {{ $t("personal_account.form.buttons.cancel") }}
                </button>
              </div>
            </div>

            <div class="password_wrap m-b-20">
              <!-- 1st screen -->
              <div class="">
                <button
                  v-if="!updatePsw"
                  @click="changePassword"
                  type="button"
                  class="btn btn-light set_btn_width btn-set text-upercase"
                >
                  {{ $t("personal_account.form.buttons.change") }}
                </button>
              </div>
              <!-- 3rd screen -->
              <!-- password screen start here -->
              <div v-if="updatePsw" class="row">
                <div class="col-lg-6">
                  <div class="k_form_group">
                    <input
                      type="password"
                      @blur="v$.personalAccount.old_password.$touch"
                      v-model.trim="personalAccount.old_password"
                      class="form-control k_inp_field"
                      :placeholder="
                        $t('personal_account.form.placeholder.old_password')
                      "
                      :class="{
                        'is-invalid': v$.personalAccount.old_password.$error,
                      }"
                    />
                    <div
                      v-if="v$.personalAccount.old_password.$error"
                      class="invalid-feedback text-left"
                    >
                      <div class="text-left fs-14">
                        {{
                          $t(
                            "personal_account.form.invalid_msgs.Old_Password_must_be_valid"
                          )
                        }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6"></div>
                <div class="col-lg-6">
                  <div class="k_form_group">
                    <input
                      type="password"
                      :placeholder="
                        $t('personal_account.form.placeholder.new_password')
                      "
                      @blur="v$.personalAccount.password.$touch"
                      v-model.trim="personalAccount.password"
                      class="form-control k_inp_field"
                      :class="{
                        'is-invalid': v$.personalAccount.password.$error,
                      }"
                    />
                    <div
                      v-if="v$.personalAccount.password.$error"
                      class="invalid-feedback text-left"
                    >
                      <div class="text-left fs-14">
                        {{
                          $t(
                            "personal_account.form.invalid_msgs.New_Password_must_be_valid"
                          )
                        }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6"></div>
                <div class="col-lg-6">
                  <div class="k_form_group">
                    <input
                      type="password"
                      :placeholder="
                        $t('personal_account.form.placeholder.confirm_password')
                      "
                      @blur="v$.personalAccount.confirm_password.$touch"
                      v-model.trim="personalAccount.confirm_password"
                      class="form-control k_inp_field"
                      :class="{
                        'is-invalid':
                          v$.personalAccount.confirm_password.$error,
                      }"
                    />
                    <div
                      v-if="v$.personalAccount.confirm_password.$errors"
                      class="invalid-feedback text-left"
                    >
                      <span
                        class="text-left fs-14"
                        v-if="
                          v$.personalAccount.confirm_password.sameAsPassword
                            .$invalid
                        "
                      >
                        {{
                          $t(
                            "personal_account.form.invalid_msgs.Password_does_not_matched"
                          )
                        }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6"></div>
              </div>
              <!-- password close here -->
            </div>
            <div class="border-top-1"></div>
            <h4 class="form_title">
              {{ $t("personal_account.form.labels.work") }}
            </h4>
            <!-- list of careers start -->
            <div v-if="careersArr.length > 0" class="careers_wrap">
              <div
                v-for="(career, index) in careersArr.slice().reverse()"
                :key="index"
              >
                <div class="career_info_container">
                  <div class="career_wrap">
                    <div class="img_wrap">
                      <img src="logo.png" class="" alt="" />
                    </div>
                    <div class="career_content_wrap">
                      <div class="in_position_wrap d-flex">
                        <h5 class="in_postion">{{ career.position }}</h5>
                        <span class="att_val">{{
                          career.seniority_level_name
                        }}</span>
                      </div>
                      <div class="in_company_wrap d-flex">
                        <h5 class="in_company">
                          {{
                            typeof career.company == "object"
                              ? career.company.label
                              : career.company
                          }}
                        </h5>
                        <span class="in_durartion att_val">
                          <span> {{ formatMyDate(career.from) }}</span> -
                          <span>{{
                            career.to ? formatMyDate(career.to) : "Present"
                          }}</span>
                        </span>
                      </div>
                      <div class="in_department_wrap">
                        <span class="att_val">{{
                          formatDepartments(career.department_list)
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="m-l-auto">
                    <button
                      @click="upadateCareer(career.id, career)"
                      type="button"
                      class="
                        btn
                        m-l-auto
                        btn-light
                        set_btn_width
                        btn-set
                        text-upercase
                      "
                      v-if="!careerInfo.includes(career.id)"
                    >
                      {{ $t("personal_account.form.buttons.change") }}
                    </button>

                    <button
                      @click="upadateCareerCancel(career.id)"
                      type="button"
                      class="
                        btn
                        m-l-auto
                        btn-light
                        set_btn_width
                        btn-set
                        text-upercase
                      "
                      v-if="careerInfo.includes(career.id)"
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                <template v-if="careerInfo.includes(career.id)">
                  <div class="row">
                    <CareerForm
                      ref="childCareer"
                      @addNewCareer="isCareerUpdated"
                      :className="'col-lg-6'"
                      :myCareer="career"
                      :departments="departmentLists.slice().reverse()"
                      :industries="industryLists"
                      :seniority="seniorityLevels"
                      :authToken="staffData.auth_token"
                    />
                  </div>
                </template>
              </div>
            </div>
            <div v-if="this.addCareer" class="">
              <div class="row" v-for="(careerV, idx) in careersList" :key="idx">
                <CareerForm
                  ref="childCareer"
                  @addNewCareer="isCareerFilled"
                  :className="'col-lg-6'"
                  :myCareer="careerV"
                  :departments="departmentLists.slice().reverse()"
                  :industries="industryLists"
                  :seniority="seniorityLevels"
                  :authToken="staffData.auth_token"
                >
                </CareerForm>
              </div>
            </div>

            <button
              v-if="toggleUpdate"
              type="button"
              @click="addMoreCareer"
              class="btn_adds btn-transaprent"
            >
              Add Carreer Information
            </button>

            <div class="btn-wrap">
              <button
                type="submit"
                class="
                  btn
                  m-l-auto
                  btn-primary
                  update_btn
                  btn-set
                  text-upercase
                "
              >
                {{ $t("personal_account.form.buttons.update_change") }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
// import Multiselect from "@vueform/multiselect";
import signupService from "../../Services/SignupService";
import commonService from "../../Services/CommonService";
import { loadLocaleMessages } from "../../i18n";
import errorhandler from "../../utils/Error";
import CareerForm from "../Auth/CareerForm.vue";
import { formatDate } from "../../utils/FormatDate";
import {
  departmentModify,
  getDepartemntsLables,
} from "../../utils/DepartmentModify";
import Dropdown from "primevue/dropdown";
import { mapGetters } from "vuex";
// import moment from "moment";
// MINIMUM 8 CHARCTER
const minimum8CharCalc = (val) => val.length >= 8;
// for upper case calculation
const upperCaseCalc = (val) => /[A-Z]/.test(val);
// for lower case calculation
const lowerCaseCalc = (val) => /[a-z]/.test(val);
// for numbers
const numberCalc = (val) => /[0-9]/.test(val);
// for special character
const specialCharCalc = (val) => {
  return /[ `!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/.test(val);
};
export default {
  components: {
    // Multiselect,
    Dropdown,
    CareerForm,
  },
  data() {
    return {
      careersArr: [],
      toggleUpdate: true,
      newAddedCareer: [],
      updateCareersArr: undefined,
      selectedLanguage: "en",
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      title: "Personal Account",
      valiImage: true,
      addCareer: undefined,
      careerInfo: [],
      clickCount: 0,

      token: {
        auth_token: "",
      },
      careersList: [
        {
          company: "",
          industry: "",
          seniority_level: "",
          department: [],
          to: "",
          from: "",
        },
      ],
      updatePsw: false,
      add_email: false,
      primary_email: true,
      newmail: "",
      showAllEmails: false,
      laguage: [
        { value: "en", label: "English", selected: true },
        { value: "de", label: "German" },
      ],
      // industryLists: [],
      // departmentLists: [],
      // seniorityLevels: [],
      profileData: {},
      personalAccount: {
        auth_token: "",
        position: "",
        firstname: "",
        lastname: "",
        username: "",
        description: "",
        alternate_emails: [],
        profile_image: "",
        email: "",
        old_password: "",
        password: "",
        confirm_password: "",
        // company: "",
        // industry: null,
        // seniority_level: null,
        // department: [],
      },
    };
  },
  computed: {
    ...mapGetters({
      departmentLists: "allCompanyDepartment",
      industryLists: "mainIndustries",
      seniorityLevels: "allSenoirityLevels",
    }),
    careerLength() {
      return this.careersArr.length;
    },
    ch_password() {
      return this.updatePsw
        ? {
            required,
            minimum8CharCalc,
            upperCaseCalc,
            lowerCaseCalc,
            numberCalc,
            specialCharCalc,
          }
        : {};
    },
    sec_mails() {
      return this.add_email
        ? {
            required,
            email,
          }
        : {};
    },
  },
  watch: {
    careerLength: function () {
      if (this.careersArr.length < 0) {
        this.addCareer = true;
      } else {
        this.addCareer = false;
      }
    },
  },

  created() {
    this.selectedLanguage = localStorage.getItem("language") || "en";
    this.authToken = this.staffData.auth_token;
    this.getStaffDetails();
    this.$store.dispatch("GET_ALL_SENOIRITY_LEVELS");
    this.$store.dispatch("GET_MAIN_INDUSTRIES");
    this.$store.dispatch("GET_ALL_COMPANY_DEPARTMENT");
  },

  validations() {
    return {
      newmail: this.sec_mails,
      personalAccount: {
        firstname: {
          required,
        },
        lastname: { required },
        username: { required },
        email: { required, email },
        old_password: this.ch_password,
        password: this.ch_password,
        confirm_password: {
          sameAsPassword: sameAs(this.personalAccount.password),
        },
      },
    };
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  methods: {
    modifyDepartment(data) {
      let deptsArr = departmentModify(data);
      return deptsArr.slice().reverse();
    },

    savePersonalInfo() {
      this.personalAccount.auth_token = this.staffData.auth_token;
      console.log(
        this.newAddedCareer,
        this.personalAccount.career_info,
        this.careersArr
      );
      if (this.addCareer === this.toggleUpdate) {
        this.$refs.childCareer.validateForm();
      }
      this.v$.$touch();
      if (!this.v$.$invalid) {
        // this.$refs.updateCareer.validateForm();
        //work start from here
        let careers = [...this.careersArr, ...this.newAddedCareer];
        const ids = careers.map((o) => o.id);
        const filteredCareer = careers.filter(
          ({ id }, index) => !ids.includes(id, index + 1)
        );
        console.log("filter arrays", filteredCareer);
        this.personalAccount.career_info = filteredCareer;
        console.log("latest career inforamtion", this.personalAccount);
        signupService
          .updatePersonalDetails(this.personalAccount)
          .then((res) => {
            if (res.data.status) {
              this.addCareer = false;
              this.toggleUpdate = true;
              this.personalAccount = res.data.data;
              this.careersArr = this.personalAccount.career_info;
              console.log("upadated data", this.careersArr);
              this.careerInfo = [];
              // this.careersList = [];
              this.personalAccount["profile"] =
                this.personalAccount.profile_image;
              this.personalAccount["profile_image"] = null;
              this.$store.dispatch("getPersonalInfo", res.data.data);
            } else {
              errorhandler(res, this);
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            console.log("");
          });
      }
    },
    upadateCareer(id, c) {
      this.toggleUpdate = false;
      this.addCareer = false;
      console.log(c);
      this.careerInfo.push(id);
    },
    upadateCareerCancel(id) {
      this.toggleUpdate = true;
      var myIndex = this.careerInfo.indexOf(id);
      if (myIndex !== -1) {
        this.careerInfo.splice(myIndex, 1);
      }
    },
    isCareerFilled(value) {
      if (value && Object.keys(value).length != 0) {
        this.newAddedCareer.push(value.newCareer);
        console.log("career arraykk ", this.newAddedCareer);
      }
    },
    isCareerUpdated(value) {
      if (value && Object.keys(value).length != 0) {
        this.newAddedCareer.push(value.newCareer);
        console.log("career array ", this.newAddedCareer);
      }
    },
    addMoreCareer() {
      this.addCareer = true;
      if (this.clickCount) {
        this.v$.$touch();
        if (!this.v$.$invalid) {
          this.careerInfo = [];
          if (this.$refs.childCareer.validateForm()) {
            console.log(
              "check validations",
              this.$refs.childCareer.validateForm()
            );
          }
          this.careersList.push({
            company: "",
            industry: "",
            seniority_level: "",
            department: [],
            from: "",
            to: "",
          });
        }
      }
      this.clickCount++;

      console.log("length", this.careersList.length);
    },
    formatMyDate(value) {
      return formatDate(value, "ll");
    },

    formatDepartments(deptArr) {
      return getDepartemntsLables(deptArr).toString();
    },
    // get staff details to be updated
    getStaffDetails() {
      this.auth_token = this.staffData.auth_token;
      this.token.auth_token = this.staffData.auth_token;
      // signupService
      //   .getPersonalDetails(this.token)
      this.$store
        .dispatch("getPersonalInfo", { auth_token: this.staffData.auth_token })
        .then((res) => {
          if (res.data.status) {
            this.profileData = res.data.data;
            this.personalAccount = res.data.data;
            this.personalAccount["profile"] =
              this.personalAccount.profile_image;
            this.personalAccount["profile_image"] = null;
            console.log("pesonal data", res.data.data);
            this.careersArr = this.personalAccount.career_info;
            console.log("career info", this.personalAccount.career_info);
          } else {
            errorhandler(res, this);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changePassword() {
      this.updatePsw = true;
    },
    removeEmail(id) {
      if (id > -1) {
        this.personalAccount.alternate_emails.splice(id, 1);
      }
      console.log("deleted array", id, this.personalAccount.alternate_emails);
    },
    addEmail(newmail) {
      console.log("new email", newmail);
      this.personalAccount.alternate_emails.push(newmail);
      console.log("emails", this.personalAccount.alternate_emails);
      this.showAllEmails = true;
      this.add_email = false;
      this.newmail = "";
    },
    updateemail() {
      console.log("updated primary email", this.personalAccount.email);
      this.primary_email = true;
    },
    addNewEmail() {
      this.add_email = true;
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
      this.personalAccount.profile = "";
      this.defaultImg = "icons/cloud-upload.svg";
    },

    onChangeLanguage() {
      let data = {
        auth_token: this.authToken,
        language: this.getLanguage(this.selectedLanguage),
      };

      this.setLanguages(data);
      // this.$router.go();
      // loadLocaleMessages(i18n, "en");
    },
    setLanguages(data) {
      console.log("set Lang", data);
      commonService.setLanguage(data).then((res) => {
        if (res.data.status) {
          console.log("data", res.data);
          localStorage.setItem("language", this.selectedLanguage);
          loadLocaleMessages(this.$i18n, this.selectedLanguage);
          this.$router.go();
        } else {
          let $th = this;
          if ("error" in res.data) {
            Object.keys(res.data.error).map(function (key) {
              $th.$toast.error(res.data.error[key], {
                position: "bottom-left",
                duration: 3712,
              });
            });
          } else {
            $th.$toast.error(res.data.message, {
              position: "bottom-left",
              duration: 3712,
            });
          }
        }
      });
    },
    getLanguage(value) {
      return {
        en: "english",
        de: "german",
      }[value];
    },
    uploadCompanyLogo(file) {
      let $th = this;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        $th.defaultImg = reader.result.toString();
        $th.personalAccount.profile_image = $th.defaultImg;
        $th.personalAccount.profile = $th.defaultImg;
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.c_logo_container {
  cursor: pointer;
}
.btn_adds {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #7900d8;
  text-align: left;
}
.careers_wrap {
  .career_info_container {
    display: flex;
    align-items: center;
    // border-bottom: 1px solid #edf1f7 !important;
    padding: 10px 0px;
    &:first-child {
      padding-top: 0px;
    }
    &:last-child {
      border-bottom: 0;
    }
  }
}
.career_wrap {
  display: inline-flex;
}
.img_wrap {
  margin-right: 10px;
  img {
    width: 60px;
  }
}
.in_postion {
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 0;
  color: #000000;
  margin-right: 15px;
  text-transform: capitalize;
}
.in_company {
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  margin-right: 15px;
  margin-bottom: 0;
  text-transform: capitalize;
}
.att_val {
  font-size: 13px;
  line-height: 20px;
  color: #8f9bb3;
  text-transform: capitalize;
}
.text-upercase {
  text-transform: uppercase;
}

.alt_email_inp {
  width: 475px;
}
.set_btn_width {
  margin-bottom: 20px;
}
.remove_mail_wrap {
  display: flex;
  // align-items: center;
}
.page_link {
  color: #7900d8;
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  padding-left: 10px;
}
.form_title {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #7900d8;
  margin-bottom: 12px;
}
.mail_val {
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: #222b45;
  // padding-bottom: 20px;
}
.primary_mail {
  font-size: 14px;
  line-height: 20px;
  color: #8f9bb3;
}
.logo_holder1 {
  margin-right: 20px;
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
.form_container {
  background-color: #ffffff;
  padding: 20px 28px;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
}
.k_lang {
  background-color: #ffffff;
  width: 200px;
  .k_inp_field {
    input {
      background-color: transparent !important;
    }
  }
}
.page_title_wrap {
  display: flex;
  align-items: center;
}
.border-top-1 {
  margin-bottom: 10px;
  border-bottom: 1px solid #e4e9f2;
}
</style>
