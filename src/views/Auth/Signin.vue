<template>
  <div class="register_auth_wrapper">
    <div class="">
      <div class="">
        <div class="main-heading-wrap text-center">
          <h2 class="main-heading">{{ $t("login.email_step.Sign_In") }}</h2>
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
              :placeholder="$t('login.email_step.form.placeholder.email')"
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
                {{ $t("login.email_step.form.invalid_msgs.email_is_required") }}
              </span>

              <span
                class="text-left fs-14"
                v-if="v$.emailVerify.email.email.$invalid"
              >
                {{ $t("login.email_step.form.invalid_msgs.Email_is_invalid") }}
              </span>
            </div>
            <div class="error_data_wrap">
              <div class="forgot_action_wrap m-l-auto">
                <router-link
                  target="_blank"
                  class="muted_link"
                  to="/signup/signin"
                >
                  {{ $t("login.email_step.forgot_password") }}</router-link
                >
              </div>
            </div>
          </div>
          <div class="d-grid space_btn2">
            <button
              :disabled="isSubmitted"
              type="submit"
              class="btn text-uppercase k_btn_block btn-primary"
            >
              <div
                v-if="isSubmitted"
                class="spinner-border text-light"
                role="status"
              >
                <span class="visually-hidden">{{ $t("login.loading") }}</span>
              </div>
              <span v-else> {{ $t("login.email_step.buttons.done") }} </span>
            </button>
          </div>
          <div class="im-user flex justify-center">
            <span class="para14"> {{ $t("login.email_step.no_account") }}</span>
            <router-link
              target="_blank"
              class="custom-link"
              :to="{ name: 'signup-register' }"
              >{{ $t("login.email_step.buttons.sign_up") }}</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Modal To check Email for varification -->
  <!-- <div
    class="modal fade"
    id="emailVerifyModal"
    ref="emailVerifyModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="emailVerifyModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <div class="verify_email">
            <h2 class="verify_title">
              <strong>Verify your email</strong>
            </h2>
          </div>
          <div class="verify-subtitle q-pb-none">
            <h6 class="">
              We've not setup your company and career information
              <strong>{{ registerForm.email }}</strong>
              <br />
              Please setup your Company first.
              <br />
              If you dont't see it please check it in your
              <strong>spam</strong> folder
            </h6>
          </div>
        </div>
        <div class="modal_action_btn">
          <button
            type="button"
            data-bs-dismiss="modal"
            @click="closeModal"
            class="btn k_btnfs14_w700 btn-primary"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import { required, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
// import { Modal } from "bootstrap";
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
  mounted() {
    // this.modal = new Modal(this.$refs.emailVerifyModal);
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
              let $th = this;
              if ("error" in response.data) {
                if ("error" in response.data) {
                  Object.keys(response.data.error).map(function (key) {
                    $th.$toast.error(response.data.error[key], {
                      position: "bottom-left",
                      duration: 3712,
                    });
                  });
                } else {
                  $th.$toast.error(response.data.message, {
                    position: "bottom-left",
                    duration: 3712,
                  });
                }
              } else {
                $th.$toast.error(response.data.message, {
                  position: "bottom-left",
                  duration: 3712,
                });
              }
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
    closeModal() {
      // this.modal.hide();
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
.error_data_wrap {
  display: flex;
  justify-content: space-between;
}
.forgot_action_wrap {
  text-align: right;
  white-space: nowrap;
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
