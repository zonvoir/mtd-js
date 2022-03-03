<template>
  <div class="register_auth_wrapper">
    <div class="">
      <div class="">
        <div class="main-heading-wrap text-center">
          <h2 class="main-heading">Update your password</h2>
          <!-- <h2 class="main-heading">
            An email has been sent to your email! Click the link to reset it.
          </h2> -->
        </div>
      </div>
      <div class="form-wrapper">
        <form action="" @submit.prevent="onSubmit">
          <div class="k_form_group psw_visibilty">
            <input
              ref="refPass"
              :type="passwordFieldType1"
              @blur="v$.resetPasswordForm.password.$touch"
              v-model.trim="resetPasswordForm.password"
              class="form-control k_inp_field"
              placeholder="Password"
              :class="{
                'is-invalid': v$.resetPasswordForm.password.$error,
              }"
            />
            <div
              v-if="
                !resetPasswordForm.password == '' ||
                v$.resetPasswordForm.password.$error
              "
              class="text-danger text-left"
            >
              <div
                class="text-left"
                :class="{
                  'text-success':
                    !v$.resetPasswordForm.password.required.$invalid,
                }"
              >
                <span class="fs-14"> Password is required</span>
              </div>
              <div
                :class="{
                  'text-success':
                    !v$.resetPasswordForm.password.minimum8CharCalc.$invalid,
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
                    !v$.resetPasswordForm.password.upperCaseCalc.$invalid,
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
                    !v$.resetPasswordForm.password.lowerCaseCalc.$invalid,
                }"
                class="text-left"
              >
                <span class="fs-14">
                  Password must contain lowerercase alphabetic characters (e.g.
                  a-z)</span
                >
              </div>

              <div
                :class="{
                  'text-success':
                    !v$.resetPasswordForm.password.numberCalc.$invalid,
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
                    !v$.resetPasswordForm.password.specialCharCalc.$invalid,
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
              @blur="v$.resetPasswordForm.confirm_password.$touch"
              v-model.trim="resetPasswordForm.confirm_password"
              class="form-control k_inp_field"
              placeholder="Confirm Password"
              :class="{
                'is-invalid': v$.resetPasswordForm.confirm_password.$error,
              }"
            />
            <div
              v-if="v$.resetPasswordForm.confirm_password.$errors"
              class="invalid-feedback text-left"
            >
              <span
                v-if="v$.resetPasswordForm.confirm_password.required.$invalid"
                class="text-left fs-14"
              >
                Confirm Password is required
              </span>

              <span
                class="text-left fs-14"
                v-if="
                  v$.resetPasswordForm.confirm_password.sameAsPassword.$invalid
                "
                >Password does not matched</span
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

          <div class="d-grid space_btn2">
            <button class="btn k_btn_block btn-primary" type="submit">
              RESET PASSWORD
            </button>
          </div>
          <div class="im-user flex justify-center">
            <span class="para14"> No account yet ?</span>
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
</template>

<script>
import { required, sameAs } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import LoginService from "../../Services/LoginService";
import errorhandler from "../../utils/Error";
// import errorhandler from "../../utils/Error";

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
  return /[ `!@#$%^&*()_+\-=\\[\]{};':"\\|,.<script>\\/?~]/.test(val);
};

export default {
  components: {
    // MicrosoftWindows,
    // Check,
  },

  data() {
    return {
      visibilityIcon1: "icons/eye-off.svg",
      visibilityIcon2: "icons/eye-off.svg",
      passwordFieldType1: "password",
      passwordFieldType2: "password",
      registeredEmail: undefined,
      visibilityPswd: false,
      token: "",
      visibilityConfirmPswd: false,
      resetPasswordForm: {
        password: "",
        confirm_password: "",
      },
    };
  },
  mounted() {
    this.$refs.refPass.focus();
    // if (!this.$route.query.token) return;
    this.$route.query.token
      ? (this.token = this.$route.query.token)
      : (this.token = "");
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  validations() {
    return {
      resetPasswordForm: {
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
          sameAsPassword: sameAs(this.resetPasswordForm.password),
        },
      },
    };
  },

  methods: {
    onSubmit() {
      this.v$.$touch();
      if (this.v$.$invalid) return;
      this.isSubmitted = true;
      console.log(this.resetPasswordForm);
      let data = {
        auth_token: this.token,
        password: this.resetPasswordForm.password,
      };
      console.log("data to save", data);
      LoginService.resetPassword(data).then((res) => {
        if (res.data.status) {
          console.log("res from forgot password", res.data.data);
          this.$router.push({ name: "signup-signin" });
        } else {
          errorhandler(res, this);
        }
      });
    },
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

<style lang="scss" scoped></style>
