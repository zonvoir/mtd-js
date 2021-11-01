<template>
  <div class="register_auth_wrapper">
    <div class="">
      <div class="">
        <div class="main-heading-wrap text-center">
          <h2 class="main-heading">Enter your password</h2>
        </div>
      </div>
      <div class="form-wrapper">
        <form @submit.prevent="onLogin" action="">
          <div class="k_form_group psw_visibilty">
            <input
              ref="refPass"
              :type="passwordFieldType"
              @blur="v$.loginForm.password.$touch"
              v-model.trim="loginForm.password"
              class="form-control k_inp_field"
              placeholder="Password"
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
                Password is required
              </div>
              <!-- <div
                v-if="v$.loginForm.password.minimum8CharCalc.$invalid"
                class="fs-14 text-left"
              >
                Strong password must be minimum 8 character
              </div>
              <div
                v-if="v$.loginForm.password.upperCaseCalc.$invalid"
                class="fs-14 text-left"
              >
                Password must contain uppercase alphabetic characters
              </div>
              <div
                v-if="v$.loginForm.password.lowerCaseCalc.$invalid"
                class="fs-14 text-left"
              >
                Password must contain lowerCaseCalc alphabetic characters
              </div>
              <div
                v-if="v$.loginForm.password.specialCharCalc.$invalid"
                class="fs-14 text-left"
              >
                Password must contain at least one special characters
              </div>
              <div
                v-if="v$.loginForm.password.numberCalc.$invalid"
                class="fs-14 text-left"
              >
                Password must contain at least one numerical characters
              </div> -->
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
            <Toggle v-model="value1" />
            <label id="toggle-label" class="toggle_label m-l-12"
              >Stay signed in</label
            >
          </div>

          <div class="d-grid space_btn_psw">
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
              <span v-else> SIGN IN </span>
            </button>
          </div>

          <div class="im-user flex justify-center">
            <span class="para14"> No account yet ?</span>
            <router-link
              target="_blank"
              class="custom-link"
              :to="{ name: 'signup-register' }"
              >Sign Up</router-link
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
import loginService from "../../Services/LoginService";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
export default {
  data() {
    return {
      visibilityIcon: EyeIcon,
      passwordFieldType: "password",
      visibility: false,
      isSubmitted: false,
      value1: true,
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
    this.loginForm.email = this.logData;
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
        console.log("lginform", this.loginForm);
        this.isSubmitted = true;
        loginService
          .createLogin(this.loginForm)
          .then((response) => {
            if (response.data.status) {
              this.$toast.success(response.data.message, {
                position: "bottom-left",
                duration: 3712,
              });
              console.log(response);
              this.formReset();
            } else {
              // let $th = this;
              Object.keys(response.data.error).map(function (key) {
                this.$toast.error(response.data.error[key], {
                  position: "bottom-left",
                  duration: 3712,
                });
              });
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
