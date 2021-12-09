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
            <Multiselect
              placeholder="English"
              :searchable="true"
              class="form-control k_inp_field"
              rules="required"
              v-model="selectedLanguage"
              @select="onChangeLanguage"
              :options="laguage"
            />
          </div>
        </div>
      </div>
      <div class="overview_container">
        <!-- <router-view /> -->
        <div class="form_container">
          <div class="">
            <h4 class="form_title">
              {{ $t("personal_account.personal_account") }}
            </h4>
          </div>

          <form @submit.prevent="savePersonalInfo" action="">
            <div class="upload_image_wrapper">
              <div class="logo_holder1">
                <div class="c_logo_container">
                  <img
                    :src="
                      personalAccount.profile_image
                        ? personalAccount.profile_image
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
                  <p v-if="valiImage" class="text-secodary m-t-10">
                    {{ $t("personal_account.form.invalid_msgs.image_hint") }}
                  </p>
                  <p v-else class="text-danger m-t-10">
                    {{ $t("personal_account.form.invalid_msgs.image_hint") }}
                  </p>
                </div>
              </div>
            </div>
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
            </div>
            <div class="border-top-1"></div>
            <h4 class="form_title">
              {{ $t("personal_account.form.labels.work") }}
            </h4>
            <div class="row">
              <div class="col-lg-6">
                <div class="k_form_group">
                  <input
                    type="text"
                    class="form-control k_inp_field"
                    :placeholder="
                      $t('personal_account.form.placeholder.company_name')
                    "
                    @blur="v$.personalAccount.company.$touch"
                    v-model.trim="personalAccount.company"
                    :class="{
                      'is-invalid': v$.personalAccount.company.$error,
                    }"
                  />
                  <div
                    v-if="v$.personalAccount.company.$error"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="v$.personalAccount.company.required.$invalid"
                      class="text-left fs-14"
                    >
                      {{
                        $t(
                          "personal_account.form.invalid_msgs.Company_Name_is_required"
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
                      $t('personal_account.form.placeholder.industry')
                    "
                    class="form-control k_inp_field"
                    rules="required"
                    :options="industryLists"
                    @blur="v$.personalAccount.industry.$touch"
                    v-model="personalAccount.industry"
                    :class="{
                      'is-invalid': v$.personalAccount.industry.$error,
                    }"
                  />
                  <div
                    v-if="v$.personalAccount.industry.$error"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="v$.personalAccount.industry.required.$invalid"
                      class="text-left fs-14"
                    >
                      {{
                        $t(
                          "personal_account.form.invalid_msgs.Industry_is_required"
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
                      $t('personal_account.form.placeholder.department')
                    "
                    mode="tags"
                    :closeOnSelect="false"
                    :searchable="true"
                    :createTag="true"
                    limit="4"
                    class="form-control k_inp_field"
                    rules="required"
                    :options="departmentLists"
                    @blur="v$.personalAccount.department.$touch"
                    v-model="personalAccount.department"
                    :class="{
                      'is-invalid': v$.personalAccount.department.$error,
                    }"
                  />
                  <div
                    v-if="v$.personalAccount.department.$error"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="v$.personalAccount.department.required.$invalid"
                      class="text-left fs-14"
                    >
                      {{
                        $t(
                          "personal_account.form.invalid_msgs.Department_is_required"
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
                      $t('personal_account.form.placeholder.position')
                    "
                    @blur="v$.personalAccount.position.$touch"
                    v-model.trim="personalAccount.position"
                    :class="{
                      'is-invalid': v$.personalAccount.position.$error,
                    }"
                  />
                  <div
                    v-if="v$.personalAccount.position.$error"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="v$.personalAccount.position.required.$invalid"
                      class="text-left fs-14"
                    >
                      {{
                        $t(
                          "personal_account.form.invalid_msgs.Position_is_required"
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
                      $t('personal_account.form.placeholder.seniority_level')
                    "
                    class="form-control k_inp_field"
                    rules="required"
                    :options="seniorityLevels"
                    @blur="v$.personalAccount.seniority_level.$touch"
                    v-model="personalAccount.seniority_level"
                    :class="{
                      'is-invalid': v$.personalAccount.seniority_level.$error,
                    }"
                  />
                  <div
                    v-if="v$.personalAccount.seniority_level.$error"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="
                        v$.personalAccount.seniority_level.required.$invalid
                      "
                      class="text-left fs-14"
                    >
                      {{
                        $t(
                          "personal_account.form.invalid_msgs.Seniority_level_is_required"
                        )
                      }}
                      <!-- Seniority level is required -->
                    </span>
                  </div>
                </div>
              </div>
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
import Multiselect from "@vueform/multiselect";
import signupService from "../../Services/SignupService";
import commonService from "../../Services/CommonService";
import { loadLocaleMessages } from "../../i18n";
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
    Multiselect,
  },
  data() {
    return {
      selectedLanguage: "en",
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      title: "Personal Account",
      valiImage: true,
      token: {
        auth_token: "",
      },
      // base64regex:
      //   /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
      updatePsw: false,
      add_email: false,
      primary_email: true,
      newmail: "",
      showAllEmails: false,
      laguage: [
        { value: "en", label: "English", selected: true },
        { value: "de", label: "German" },
      ],
      industryLists: [],
      departmentLists: [],
      seniorityLevels: [],
      profileData: {},
      personalAccount: {
        auth_token: "",
        position: "",
        firstname: "",
        lastname: "",
        username: "",
        alternate_emails: [],
        profile_image: "",
        email: "",
        old_password: "",
        password: "",
        confirm_password: "",
        company: "",
        industry: null,
        seniority_level: null,
        department: [],
      },
    };
  },
  computed: {
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
  created() {
    this.selectedLanguage = localStorage.getItem("language") || "en";
    this.authToken = this.staffData.auth_token;
    this.getStaffDetails();
    // staffData.auth_token;
  },
  mounted() {},
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
        company: { required },
        position: { required },
        industry: { required },
        department: { required },
        seniority_level: { required },
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
    savePersonalInfo() {
      // console.log("img", this.personalAccount.profile_image);
      // if (this.base64regex.test(this.personalAccount.profile_image)) {
      //   console.log("true");
      // } else {
      //   console.log("false");
      //   // this.personalAccount.profile_image = "";
      // }

      // if (
      //   this.profileData.profile_image === this.personalAccount.profile_image
      // ) {
      //   this.personalAccount.profile_image = "";
      // }
      this.personalAccount.auth_token = this.staffData.auth_token;
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        signupService
          .updatePersonalDetails(this.personalAccount)
          .then((res) => {
            if (res.data.status) {
              // console.log("post personal data", res.data.data);
              this.personalAccount = res.data.data;
              localStorage.setItem("memberPic", res.data.data.profile_image);
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
                if (res.data.message === "Authentication token mismatch") {
                  this.$router.push({ name: "signup-signin" });
                }
              }
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
    // get staff details to be updated
    getStaffDetails() {
      this.auth_token = this.staffData.auth_token;
      this.token.auth_token = this.staffData.auth_token;
      signupService
        .getPersonalDetails(this.token)
        .then((res) => {
          if (res.data.status) {
            this.profileData = res.data.data;
            this.personalAccount = res.data.data;
            localStorage.setItem("memberPic", res.data.data.profile_image);
            // Industry list
            for (var i = 0; i < res.data.industry_list.length; i++) {
              let industry = {
                value: res.data.industry_list[i].id,
                label: res.data.industry_list[i].name,
              };
              this.industryLists.push(industry);
            }
            // Seniority list
            for (var j = 0; j < res.data.seniority_list.length; j++) {
              let seniorLevel = {
                value: res.data.seniority_list[j].id,
                label: res.data.seniority_list[j].level,
              };
              this.seniorityLevels.push(seniorLevel);
            }
            // Department list
            for (var k = 0; k < res.data.departments_list.length; k++) {
              let dept = {
                value: res.data.departments_list[k].departmentid,
                label: res.data.departments_list[k].name,
              };
              this.departmentLists.push(dept);
            }
          } else {
            let $th = this;
            Object.keys(res.data.error).map(function (key) {
              console.log("failed");
              $th.$toast.error(res.data.error[key], {
                position: "bottom-left",
                duration: 3712,
              });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log("");
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

        console.log($th.defaultImg);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
      console.log("selected file", file);
    },
  },
};
</script>

<style lang="scss" scoped>
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
