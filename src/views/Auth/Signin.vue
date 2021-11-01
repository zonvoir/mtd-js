<template>
  <div class="register_auth_wrapper">
    <div class="">
      <div class="">
        <div class="main-heading-wrap text-center">
          <h2 class="main-heading">Sign In</h2>
        </div>
      </div>
      <div class="form-wrapper">
        <form @submit.prevent="onSubmit" action="">
          <div class="k_form_group">
            <input
              type="email"
              @blur="v$.emailVerify.email.$touch"
              v-model.trim="emailVerify.email"
              class="form-control k_inp_field"
              placeholder="Email"
              :class="{
                'is-invalid': v$.emailVerify.email.$error,
              }"
            />
            <div
              v-if="v$.emailVerify.email.$errors"
              class="invalid-feedback text-left"
            >
              <span
                v-if="v$.emailVerify.email.required.$invalid"
                class="text-left fs-14"
              >
                Email is required
              </span>

              <span
                class="text-left fs-14"
                v-if="v$.emailVerify.email.email.$invalid"
                >Email is invalid</span
              >
            </div>
          </div>
          <div class="forgot_action_wrap">
            <router-link target="_blank" class="muted_link" to="/signup/signin"
              >Forgot your password</router-link
            >
          </div>
          <div class="d-grid space_btn2">
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
              <span v-else> Done </span>
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
import loginService from "../../Services/LoginService";
export default {
  data() {
    return {
      isSubmitted: false,
      emailVerify: {
        email: "",
      },
    };
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  validations() {
    return {
      emailVerify: {
        email: { required, email },
      },
    };
  },
  methods: {
    onSubmit() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        this.isSubmitted = true;
        console.log("validation successfull", this.emailVerify);
        loginService
          .emailVerifcationLogin(this.emailVerify)
          .then((response) => {
            if (response.data.status) {
              sessionStorage.setItem(
                "OiJKV1QiLCJhbGciOiJIUzI1",
                JSON.stringify(response.data.email)
              );
              this.$toast.success(response.data.message, {
                position: "bottom-left",
                duration: 3712,
              });
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
      this.emailVerify = {
        email: "",
      };
      this.$router.push({ name: "signin-password" });
    },
  },
};
</script>

<style lang="scss" scoped>
.forgot_action_wrap {
  text-align: right;
  .muted_link {
    color: #8f9bb3;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    &:hover {
      color: #8f9bb3;
      text-decoration: none;
    }
  }
}
</style>
