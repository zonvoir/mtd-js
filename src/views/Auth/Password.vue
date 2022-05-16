<template>
  <div class="">
    <div class="custom_brand_logo">
      <MainLogo />
    </div>
    <div class="register_auth_wrapper">
      <div class="">
        <div class="">
          <div class="main-heading-wrap text-center">
            <h2 class="main-heading">
              {{ $t("login.password_step.enter_password") }}
            </h2>
          </div>
        </div>
        <div class="">
          <form @submit.prevent="onLogin" action="">
            <div class="k_form_group psw_visibilty">
              <input
                ref="focusInp"
                :type="passwordFieldType"
                @blur="v$.loginForm.password.$touch"
                v-model.trim="loginForm.password"
                class="form-control k_inp_field"
                :placeholder="
                  $t('login.password_step.form.placeholder.password')
                "
                :class="{
                  'is-invalid': v$.loginForm.password.$error,
                }"
              />
              <div
                v-if="v$.loginForm.password.$error"
                class="invalid-feedback text-left"
              >
                <span
                  v-if="v$.loginForm.password.required.$invalid"
                  class="text-left fs-14"
                >
                  {{
                    $t(
                      "login.password_step.form.invalid_msgs.password_is_required"
                    )
                  }}
                </span>
                <span
                  v-else-if="v$.loginForm.password.upperCaseCalc.$invalid"
                  class="text-left fs-14"
                >
                  Password must contain uppercase alphabetic characters (e.g.
                  A-Z)
                </span>
                <span
                  v-else-if="v$.loginForm.password.numberCalc.$invalid"
                  class="text-left fs-14"
                >
                  Password must have at least one numerical character(e.g. 0-9)
                </span>

                <span
                  v-else-if="v$.loginForm.password.lowerCaseCalc.$invalid"
                  class="text-left fs-14"
                >
                  Password must contain lowerercase alphabetic characters (e.g.
                  a-z)
                </span>
                <span
                  v-else-if="v$.loginForm.password.specialCharCalc.$invalid"
                  class="text-left fs-14"
                >
                  Password must have at least one special character
                </span>
                <span
                  v-else-if="v$.loginForm.password.minimum8CharCalc.$invalid"
                  class="text-left fs-14"
                >
                  Strong password must be minimum 8 character
                </span>
              </div>
              <span class="visibilty_btn">
                <button
                  @click="switchVisibility"
                  type="button"
                  class="btn eye_btn btn-white"
                >
                  <img :src="visibilityIcon" class="eye_icon" />
                </button>
              </span>
            </div>
            <div class="d-flex justify-content-between">
              <div class="k_form_group k_toggle">
                <Toggle v-model="stay_signIn" />
                <label id="toggle-label" class="toggle_label m-l-12">{{
                  $t("login.password_step.stay_signed")
                }}</label>
              </div>
              <div class="">
                <div class="forgot_action_wrap m-l-auto">
                  <router-link
                    class="muted_link"
                    :to="{ name: 'signin-update-password' }"
                  >
                    {{ $t("login.email_step.forgot_password") }}</router-link
                  >
                </div>
              </div>
            </div>
            <div class="space_btn_psw">
              <div class="d-grid">
                <button
                  :disabled="isSubmitted"
                  type="submit"
                  class="btn k_btn_block btn-primary text-uppercase"
                >
                  <div
                    v-if="isSubmitted"
                    class="spinner-border text-light"
                    role="status"
                  >
                    <span class="visually-hidden">{{
                      $t("login.password_step.loading")
                    }}</span>
                  </div>
                  <span v-else>
                    {{ $t("login.password_step.buttons.sign_in") }}
                  </span>
                </button>
              </div>

              <div class="im-user flex justify-center">
                <span class="para14">{{
                  $t("login.password_step.no_account")
                }}</span>
                <router-link
                  class="custom-link"
                  :to="{ name: 'signup-register' }"
                  >{{ $t("login.password_step.buttons.sign_up") }}</router-link
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toggle from "@vueform/toggle";
import EyeIcon from "../../assets/images/icons/eye.svg";
import EyeOffIcon from "../../assets/images/icons/eye-off.svg";
import MainLogo from "../../components/Shared/MainLogo.vue";

// MINIMUM 8 CHARCTER
const minimum8CharCalc = (val) => !helpers.req(val) || val.length >= 8;
// for upper case calculation
const upperCaseCalc = (val) => !helpers.req(val) || /[A-Z]/.test(val);
// for lower case calculation
const lowerCaseCalc = (val) => !helpers.req(val) || /[a-z]/.test(val);
// for numbers
const numberCalc = (val) => !helpers.req(val) || /[0-9]/.test(val);
// for special character
const specialCharCalc = (val) => {
  return (
    !helpers.req(val) || /[ `!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/.test(val)
  );
};
import { required, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import errorhandler from "../../utils/Error";
import LoginService from "../../Services/LoginService";
export default {
  // changed this OiJKV1QiLCJhbGciOiJIUzI1 to QiLC1IUzI1JhbGciOiKV

  data() {
    return {
      visibilityIcon: EyeIcon,
      passwordFieldType: "password",
      visibility: false,
      isSubmitted: false,
      stay_signIn: false,
      logData: JSON.parse(sessionStorage.getItem("QiLC1IUzI1JhbGciOiKV")),
      loginForm: {
        email: "",
        password: "",
      },
    };
  },
  components: {
    Toggle,
    MainLogo,
  },
  created() {
    if (
      sessionStorage.getItem("QiLC1IUzI1JhbGciOiKV") == undefined ||
      sessionStorage.getItem("QiLC1IUzI1JhbGciOiKV") == null
    ) {
      this.$router.push({ name: "signup-signin" });
    }
    this.loginForm.email = this.logData.email;
  },
  mounted() {
    this.$refs.focusInp.focus();
  },
  validations() {
    return {
      loginForm: {
        password: {
          required,
          minimum8CharCalc,
          upperCaseCalc,
          lowerCaseCalc,
          numberCalc,
          specialCharCalc,
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
    onLogin() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        this.logData.stay_signIn = this.stay_signIn;

        sessionStorage.setItem(
          "QiLC1IUzI1JhbGciOiKV",
          JSON.stringify(this.logData)
        );
        console.log("lginform", this.logData);
        this.isSubmitted = true;
        LoginService.createLogin(this.loginForm)
          .then((response) => {
            if (response.data.status) {
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
      this.loginForm = {
        password: "",
      };
      this.$router.push({ name: "signin-verify-account" });
    },
    switchVisibility() {
      this.visibility = !this.visibility;
      this.passwordFieldType = this.visibility ? "text" : "password";
      this.visibilityIcon = this.visibility ? EyeOffIcon : EyeIcon;
    },
  },
};
</script>

<style lang="scss" scoped></style>
