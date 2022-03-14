<template>
  <div class="register_auth_wrapper">
    <div v-if="reserLinkStatus" class="main-heading-wrap text-center">
      <h2 class="main-heading success_heading">
        An email has been sent to your email! Click the link to reset it.
      </h2>
    </div>
    <div v-else class="">
      <div class="">
        <div class="main-heading-wrap text-center">
          <h2 class="main-heading">Update your password</h2>
        </div>
      </div>
      <div class="form-wrapper">
        <form action="" @submit.prevent="onSubmit">
          <div class="k_form_group">
            <input
              type="email"
              class="form-control k_inp_field"
              placeholder="Email Address"
              @blur="v$.forgetPasswordForm.email.$touch"
              v-model.trim="forgetPasswordForm.email"
              :class="{
                'is-invalid': v$.forgetPasswordForm.email.$error,
              }"
            />
            <div
              v-if="v$.forgetPasswordForm.email.$errors"
              class="invalid-feedback text-left"
            >
              <span
                v-if="v$.forgetPasswordForm.email.required.$invalid"
                class="text-left fs-14"
              >
                Email is required
              </span>

              <span
                class="text-left fs-14"
                v-if="v$.forgetPasswordForm.email.email.$invalid"
                >Email is invalid</span
              >
            </div>
          </div>

          <div class="d-grid space_btn2">
            <button
              :disabled="isSubmitted"
              class="btn k_btn_block btn-primary"
              type="submit"
            >
              RESET PASSWORD
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
import { required, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import errorhandler from "../../utils/Error";
import LoginService from "../../Services/LoginService";
export default {
  data() {
    return {
      reserLinkStatus: false,
      isSubmitted: false,
      forgetPasswordForm: {
        email: "",
      },
    };
  },

  validations() {
    return {
      forgetPasswordForm: {
        email: {
          required,
          email,
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
    onSubmit() {
      this.v$.$touch();
      if (this.v$.$invalid) return;
      this.isSubmitted = true;
      console.log("email", this.forgetPasswordForm);
      LoginService.forgotPassword(this.forgetPasswordForm)
        .then((res) => {
          if (res.data.status) {
            this.reserLinkStatus = true;
          } else {
            errorhandler(res, this);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isSubmitted = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.success_heading {
  padding: 0 5rem;
}
</style>
