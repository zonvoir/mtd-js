<template>
  <div>
    <div class="change_user_email">
      <slot name="change-email"> </slot>
    </div>

    <div
      class="modal custom_modal_email fade"
      id="exampleModal"
      ref="exampleModal"
      tabindex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content set_modal_width">
          <div class="modal-body update_email_body">
            <div class="text-left">
              <h5 class="update_email_title">Change your email</h5>
            </div>
            <form @submit.prevent="onChangeEmail" action="">
              <div class="">
                <div class="k_form_group text-left">
                  <label class="update_email_label"
                    >Enter a new registration email</label
                  >
                  <input
                    type="email"
                    v-model.trim="updateEmailForm.email"
                    @blur="v$.updateEmailForm.email.$touch"
                    class="form-control k_inp_field"
                    :class="{
                      'is-invalid': v$.updateEmailForm.email.$error,
                    }"
                    placeholder="Enter email"
                  />
                  <div
                    v-if="v$.updateEmailForm.email.$errors"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="v$.updateEmailForm.email.required.$invalid"
                      class="text-left fs-14"
                    >
                      {{
                        $t(
                          "login.email_step.form.invalid_msgs.email_is_required"
                        )
                      }}
                    </span>

                    <span
                      class="text-left fs-14"
                      v-if="v$.updateEmailForm.email.email.$invalid"
                    >
                      {{
                        $t(
                          "login.email_step.form.invalid_msgs.Email_is_invalid"
                        )
                      }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="btns_wrap">
                <button
                  type="reset"
                  @click="closeModal"
                  class="btn btn-light btn-set text-uppercase m-r-20"
                >
                  Cancel
                </button>
                <!-- @click="onChangeEmail" -->
                <button
                  :disabled="isSubmitted"
                  type="submit"
                  class="btn btn-primary btn-set text-uppercase"
                >
                  <div v-if="isSubmitted">
                    <span
                      class="spinner-border text-light"
                      role="status"
                    ></span>
                    Loading...
                  </div>
                  <span v-else> Submit </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import { required, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { updateSessionStorage } from "../../../utils/commonHelperFuntions";
import LoginService from "../../../Services/LoginService";
import errorhandler from "../../../utils/Error";
export default {
  data() {
    return {
      modal: null,
      staffData: JSON.parse(sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1")),
      isSubmitted: false,
      updateEmailForm: {
        email: "",
      },
    };
  },

  mounted() {
    this.modal = new Modal(this.$refs.exampleModal);
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      updateEmailForm: {
        email: { required, email },
      },
    };
  },
  methods: {
    onChangeEmail() {
      this.updateEmailForm.auth_token = this.staffData.auth_token;
      this.v$.$touch();
      if (!this.v$.$invalid) {
        LoginService.editEmailOnRegister(this.updateEmailForm).then((res) => {
          if (res.data.status) {
            updateSessionStorage("OiJKV1QiLCJhbGciOiJIUzI1", [
              { email: this.updateEmailForm.email },
            ]);
            this.$emit("changeEmail", this.updateEmailForm.email);
            this.closeModal();
          } else {
            errorhandler(res);
          }
        });
      }
    },
    resetForm() {
      this.v$.$reset();

      this.updateEmailForm = {
        email: "",
      };
      this.modal.hide();
    },
    openModal() {
      this.modal.show();
    },

    closeModal() {
      this.resetForm();
    },
  },
};
</script>

<style lang="scss" scoped>
.update_email_title {
  font-weight: 700;
  font-size: 20px;
  line-height: 32px;
  color: #222b45;
  margin-bottom: 20px;
}
.btns_wrap {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  .btn {
    padding: 0.375rem 3rem;
  }
}

.update_email_label {
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  margin-bottom: 18px;
  color: #8f9bb3;
}
</style>
