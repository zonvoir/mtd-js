<template>
  <div class="register_auth_wrapper">
    <div class="">
      <div class="">
        <div class="main-heading-wrap text-center">
          <h2 class="main-heading">
            {{ $t("login.password_step.enter_password") }}
          </h2>
        </div>
      </div>
      <div class="form-wrapper">
        <form @submit.prevent="onLogin" action="">
          <div class="k_form_group psw_visibilty">
            <input
              ref="focusInp"
              :type="passwordFieldType"
              @blur="v$.loginForm.password.$touch"
              v-model.trim="loginForm.password"
              class="form-control k_inp_field"
              :placeholder="$t('login.password_step.form.placeholder.password')"
              :class="{
                'is-invalid': v$.loginForm.password.$error,
              }"
            />
            <div
              v-if="v$.loginForm.password.$error"
              class="invalid-feedback text-left"
            >
              <div
                v-if="v$.loginForm.password.required.$invalid"
                class="text-left fs-14"
              >
                {{
                  $t(
                    "login.password_step.form.invalid_msgs.password_is_required"
                  )
                }}
              </div>
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
          <div class="k_form_group k_toggle">
            <Toggle v-model="stay_signIn" />
            <label id="toggle-label" class="toggle_label m-l-12">{{
              $t("login.password_step.stay_signed")
            }}</label>
          </div>

          <div class="d-grid space_btn_psw">
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
              target="_blank"
              class="custom-link"
              :to="{ name: 'signup-register' }"
              >{{ $t("login.password_step.buttons.sign_up") }}</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Toggle from "@vueform/toggle";
import EyeIcon from "../../assets/images/icons/eye.svg";
import EyeOffIcon from "../../assets/images/icons/eye-off.svg";
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
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import errorhandler from "../../utils/Error";
import LoginService from "../../Services/LoginService";
// import loginService from "../../Services/LoginService";
// import errorhandler from "../../utils/Error";
export default {
  data() {
    return {
      visibilityIcon: EyeIcon,
      passwordFieldType: "password",
      visibility: false,
      isSubmitted: false,
      stay_signIn: false,
      logData: JSON.parse(sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1")),
      loginForm: {
        email: "",
        password: "",
      },
    };
  },
  components: {
    Toggle,
  },
  created() {
    if (
      sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") == undefined ||
      sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") == null
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
          "OiJKV1QiLCJhbGciOiJIUzI1",
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

<style lang="scss" scoped>
.space_btn_psw {
  margin-top: 460px;
  padding-bottom: 30px;
}
</style>
