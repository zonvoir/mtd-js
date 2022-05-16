<template>
  <div class="">
    <div class="stepper_withlogo">
      <RegistrationHeader />
    </div>
    <div class="register_auth_wrapper">
      <div class="">
        <div class="">
          <div class="main-heading-wrap text-center">
            <h2 class="main-heading">
              {{ $t("register_step.title_heading") }}
            </h2>
          </div>
        </div>
        <div class="">
          <form @submit.prevent="onSubmit" action="">
            <h5 class="section_heading">
              {{ $t("register_step.personal_info") }}
            </h5>
            <div class="k_form_group">
              <input
                type="text"
                name="firstName"
                ref="focusInp"
                @blur="v$.registerForm.firstname.$touch"
                v-model.trim="registerForm.firstname"
                class="form-control k_inp_field"
                :placeholder="$t('register_step.form.placeholder.Firstname')"
                :class="{
                  'is-invalid': v$.registerForm.firstname.$error,
                }"
              />
              <span
                v-if="v$.registerForm.firstname.$error"
                class="invalid-feedback text-left"
              >
                {{
                  $t("register_step.form.invalid_msgs.firstname_is_required")
                }}
                <!-- First Name is required -->
              </span>
            </div>
            <div class="k_form_group">
              <input
                type="text"
                @blur="v$.registerForm.lastname.$touch"
                v-model.trim="registerForm.lastname"
                class="form-control k_inp_field"
                :placeholder="$t('register_step.form.placeholder.Lastname')"
                :class="{
                  'is-invalid': v$.registerForm.lastname.$error,
                }"
              />
              <span
                v-if="v$.registerForm.lastname.$error"
                class="invalid-feedback text-left"
              >
                {{ $t("register_step.form.invalid_msgs.lastname_is_required") }}
              </span>
            </div>
            <h5 class="section_heading">
              {{ $t("register_step.account_info") }}
            </h5>
            <div class="k_form_group">
              <input
                type="text"
                @blur="v$.registerForm.username.$touch"
                v-model.trim="registerForm.username"
                class="form-control k_inp_field"
                :placeholder="$t('register_step.form.placeholder.Useraname')"
                :class="{
                  'is-invalid': v$.registerForm.username.$error,
                }"
              />
              <span
                v-if="v$.registerForm.username.$error"
                class="invalid-feedback text-left"
              >
                {{ $t("register_step.form.invalid_msgs.username_is_required") }}
              </span>
            </div>

            <div class="k_form_group">
              <input
                :readonly="registerForm.invitation_id != ''"
                type="email"
                @blur="v$.registerForm.email.$touch"
                v-model.trim="registerForm.email"
                class="form-control k_inp_field"
                :placeholder="$t('register_step.form.placeholder.email')"
                :class="{
                  'is-invalid': v$.registerForm.email.$error,
                }"
              />
              <div
                v-if="v$.registerForm.email.$errors"
                class="invalid-feedback text-left"
              >
                <span
                  v-if="v$.registerForm.email.required.$invalid"
                  class="text-left fs-14"
                >
                  {{ $t("register_step.form.invalid_msgs.email_is_required") }}
                </span>

                <span
                  class="text-left fs-14"
                  v-if="v$.registerForm.email.email.$invalid"
                  >{{
                    $t("register_step.form.invalid_msgs.Email_is_invalid")
                  }}</span
                >
              </div>
            </div>
            <div class="k_form_group psw_visibilty">
              <input
                ref="refPass"
                :type="passwordFieldType1"
                @blur="v$.registerForm.password.$touch"
                v-model.trim="registerForm.password"
                class="form-control k_inp_field"
                :placeholder="$t('register_step.form.placeholder.password')"
                :class="{
                  'is-invalid': v$.registerForm.password.$error,
                }"
              />
              <div
                v-if="
                  !registerForm.password == '' ||
                  v$.registerForm.password.$error
                "
                class="text-danger text-left"
              >
                <div
                  class="text-left"
                  :class="{
                    'text-success': !v$.registerForm.password.required.$invalid,
                  }"
                >
                  <span class="fs-14">
                    {{
                      $t("register_step.form.invalid_msgs.password_is_required")
                    }}</span
                  >
                </div>
                <div
                  :class="{
                    'text-success':
                      !v$.registerForm.password.minimum8CharCalc.$invalid,
                  }"
                  class="text-left d-flex"
                >
                  <span class="fs-14">
                    Strong password must be minimum 8 character</span
                  >
                </div>

                <div
                  :class="{
                    'text-success':
                      !v$.registerForm.password.upperCaseCalc.$invalid,
                  }"
                  class="text-left"
                >
                  <span class="fs-14">
                    Password must contain uppercase alphabetic characters (e.g.
                    A-Z)</span
                  >
                </div>

                <div
                  :class="{
                    'text-success':
                      !v$.registerForm.password.lowerCaseCalc.$invalid,
                  }"
                  class="text-left"
                >
                  <span class="fs-14">
                    Password must contain lowerercase alphabetic characters
                    (e.g. a-z)</span
                  >
                </div>

                <div
                  :class="{
                    'text-success':
                      !v$.registerForm.password.numberCalc.$invalid,
                  }"
                  class="text-left"
                >
                  <span class="fs-14">
                    Password must have at least one numerical character(e.g.
                    0-9)</span
                  >
                </div>

                <div
                  :class="{
                    'text-success':
                      !v$.registerForm.password.specialCharCalc.$invalid,
                  }"
                  class="text-left"
                >
                  <span class="fs-14">
                    Password must have at least one special character</span
                  >
                </div>
              </div>
              <span class="visibilty_btn">
                <button
                  @click="switchVisibilityPswd"
                  type="button"
                  class="btn eye_btn btn-white"
                >
                  <img :src="visibilityIcon1" class="eye_icon" />
                </button>
              </span>
            </div>
            <div class="k_form_group psw_visibilty">
              <input
                :type="passwordFieldType2"
                @click="sw"
                @blur="v$.registerForm.confirm_password.$touch"
                v-model.trim="registerForm.confirm_password"
                class="form-control k_inp_field"
                :placeholder="
                  $t('register_step.form.placeholder.confirm_password')
                "
                :class="{
                  'is-invalid': v$.registerForm.confirm_password.$error,
                }"
              />
              <div
                v-if="v$.registerForm.confirm_password.$errors"
                class="invalid-feedback text-left"
              >
                <span
                  v-if="v$.registerForm.confirm_password.required.$invalid"
                  class="text-left fs-14"
                >
                  {{
                    $t(
                      "register_step.form.invalid_msgs.confirm_password_is_required"
                    )
                  }}
                </span>

                <span
                  class="text-left fs-14"
                  v-if="
                    v$.registerForm.confirm_password.sameAsPassword.$invalid
                  "
                  >{{
                    $t("register_step.form.invalid_msgs.password_not_match")
                  }}</span
                >
              </div>

              <span class="visibilty_btn">
                <button
                  @click="switchVisibilityConfirmPswd"
                  type="button"
                  class="btn eye_btn btn-white"
                >
                  <img :src="visibilityIcon2" class="eye_icon" />
                </button>
              </span>
            </div>
            <div class="p-b-10">
              <div class="check_box_wrapper">
                <label class="k_checkbox check_lable">
                  {{ $t("register_step.i_agree") }}
                  <!-- I agree with the -->
                  <a
                    target="_blank"
                    class="custom-link"
                    href="https://www.w3schools.com"
                    >{{ $t("register_step.terms_condtion") }}</a
                  >
                  <input
                    type="checkbox"
                    :class="{
                      'is-invalid': v$.registerForm.terms_service.$error,
                    }"
                    v-model="registerForm.terms_service"
                    checked="checked"
                  />
                  <span
                    v-if="v$.registerForm.terms_service.$error"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="v$.registerForm.terms_service.required.$invalid"
                      class="text-left"
                    >
                      {{
                        $t(
                          "register_step.form.invalid_msgs.terms_and_condition"
                        )
                      }}
                    </span>
                  </span>
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>

            <div class="">
              <div class="check_box_wrapper">
                <label class="k_checkbox check_lable">
                  {{ $t("register_step.i_read") }}
                  <a
                    target="_blank"
                    class="custom-link"
                    href="https://www.w3schools.com"
                    >{{ $t("register_step.privacy_policy") }}</a
                  >
                  <input
                    type="checkbox"
                    v-model="registerForm.privacy_policy"
                    :class="{
                      'is-invalid': v$.registerForm.privacy_policy.$error,
                    }"
                    checked="checked"
                  />
                  <span class="checkmark"></span>
                  <span
                    v-if="v$.registerForm.privacy_policy.$error"
                    class="invalid-feedback text-left"
                  >
                    <!-- Please accept privacy and policy reuired -->
                    <span
                      v-if="v$.registerForm.privacy_policy.required.$invalid"
                      class="text-left"
                    >
                      {{
                        $t("register_step.form.invalid_msgs.privacy_and_policy")
                      }}
                    </span>
                  </span>
                </label>
              </div>
            </div>
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
                    {{ $t("register_step.buttons.create_account") }}
                  </span>
                </button>
              </div>
              <div class="im-user flex justify-center">
                <span class="para14">{{
                  $t("register_step.already_account")
                }}</span>
                <router-link
                  class="custom-link"
                  :to="{ name: 'signup-signin' }"
                  >{{ $t("register_step.buttons.sign_in") }}</router-link
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <!-- <EmailNotificationModal ref="notifyEmail" :userEmail="registeredEmail" /> -->
</template>
<script>
import { ref } from "vue";
import { required, email, sameAs } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
// import { Modal } from "bootstrap";
// import EmailNotificationModal from "./Components/EmailNotificationModal.vue";
import signupService from "../../Services/SignupService";
import errorhandler, { successhandler } from "../../utils/Error";

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
import RegistrationHeader from "../../Layout/RegisterLayout/RegisterationHeader.vue";
export default {
  components: {
    RegistrationHeader,
  },

  data() {
    return {
      visibilityIcon1: "icons/eye-off.svg",
      visibilityIcon2: "icons/eye-off.svg",
      passwordFieldType1: "password",
      passwordFieldType2: "password",
      // registeredEmail: undefined, no modal required
      visibilityPswd: false,
      visibilityConfirmPswd: false,
      isSubmitted: false,
      invitedUserData: undefined,
      // openModal:false,
      registerForm: {
        privacy_policy: false,
        terms_service: false,
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        invitation_id: "",
        password: "",
        confirm_password: "",
      },
      // modal: null,
    };
  },

  validations() {
    return {
      registerForm: {
        privacy_policy: {
          required(val) {
            return val;
          },
        },
        terms_service: {
          required(val) {
            return val;
          },
        },
        firstname: { required },
        lastname: { required },
        username: { required },
        email: { required, email },
        password: {
          required,

          minimum8CharCalc,
          upperCaseCalc,
          lowerCaseCalc,
          numberCalc,
          specialCharCalc,
        },
        confirm_password: {
          required,
          sameAsPassword: sameAs(this.registerForm.password),
        },
      },
    };
  },

  mounted() {
    this.$refs.focusInp.focus();
    // this.modal = new Modal(this.$refs.exampleModal);
    this.invitedUserData = JSON.parse(
      localStorage.getItem("bWFInpvitedbpbUser")
    );
    if (this.invitedUserData && Object.keys(this.invitedUserData).length != 0) {
      this.registerForm.email = this.invitedUserData.email;
      this.registerForm.invitation_id = this.invitedUserData.invitation_id;
    }
  },

  created() {
    //   let url = this.$route.path;
    let activePage = this.$route.path.split("/")[2];
    this.$store.dispatch("GET_ACTIVE_PAGE", activePage);
    let invitedStaffData = this.$route.query;
    if (invitedStaffData && Object.keys(invitedStaffData).length != 0) {
      console.log("invited user is awailble");
      invitedStaffData.departments = invitedStaffData.departments.split(",");
      localStorage.setItem(
        "bWFInpvitedbpbUser",
        JSON.stringify(invitedStaffData)
      );
    }
  },

  setup() {
    return {
      isPwd: ref(true),
      v$: useVuelidate(),
    };
  },
  methods: {
    onSubmit() {
      // console.log("all data ia filled", this.$refs.notifyEmail.modal.show());

      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        this.isSubmitted = true;
        signupService
          .create(this.registerForm)
          .then((response) => {
            if (response.data.status) {
              console.log("regitration respponse", response.data.data);
              // this.registeredEmail = response.data.data.email; no maodal required
              successhandler(response);
              // new flow
              sessionStorage.setItem(
                "OiJKV1QiLCJhbGciOiJIUzI1",
                JSON.stringify(response.data.data)
              );
              this.$router.push({ name: "signup-career" });
              this.formReset();
              // new flow
              // if (this.invitedUserData === null) {
              //   this.$refs.notifyEmail.modal.show();
              //   // this.modal.show(); no need here........
              // } else {
              //   sessionStorage.setItem(
              //     "OiJKV1QiLCJhbGciOiJIUzI1",
              //     JSON.stringify(response.data.data)
              //   );
              //   this.$router.push({ name: "signup-career" });
              //   console.log("userSata");
              // }
              // this.formReset();
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
      this.registerForm = {
        privacy_policy: false,
        terms_service: false,
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        invitation_id: "",
      };
    },
    // closeModal() {
    //   this.modal.hide();
    // },
    switchVisibilityPswd() {
      this.visibilityPswd = !this.visibilityPswd;
      this.passwordFieldType1 = this.visibilityPswd ? "text" : "password";
      this.visibilityIcon1 = this.visibilityPswd
        ? "icons/eye.svg"
        : "icons/eye-off.svg";
    },
    switchVisibilityConfirmPswd() {
      this.visibilityConfirmPswd = !this.visibilityConfirmPswd;
      this.passwordFieldType2 = this.visibilityConfirmPswd
        ? "text"
        : "password";
      this.visibilityIcon2 = this.visibilityConfirmPswd
        ? "icons/eye.svg"
        : "icons/eye-off.svg";
    },
  },
};
</script>

<style lang="scss" scoped>
.modal_action_btn {
  text-align: right;
  padding: 0 16px 16px 16px;
}
.verify_email {
  .verify_title {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 40px;
    color: #222b45;
  }
}

.verify-subtitle {
  padding-bottom: 0 !important;
}
</style>
