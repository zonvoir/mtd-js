<template>
  <div>
    <div class="change_user_email">
      <slot name="change-email"> </slot>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      ref="exampleModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body update_email_body">
            <div class="text-left">
              <h5 class="update_email_title">Change your email</h5>
            </div>
            <form action="">
              <div class="">
                <div class="k_form_group text-left">
                  <label class="update_email_label"
                    >Enter a new registration email</label
                  >
                  <input
                    type="email"
                    v-model.trim="updateEmailForm.newEmail"
                    @blur="v$.updateEmailForm.newEmail.$touch"
                    class="form-control k_inp_field"
                    :class="{
                      'is-invalid': v$.updateEmailForm.newEmail.$error,
                    }"
                    placeholder="Enter email"
                  />
                  <div
                    v-if="v$.updateEmailForm.newEmail.$errors"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="v$.updateEmailForm.newEmail.required.$invalid"
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
                      v-if="v$.updateEmailForm.newEmail.email.$invalid"
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
                  @click="closeModal"
                  class="btn btn-light btn-set text-uppercase m-r-20"
                >
                  Cancel
                </button>
                <button
                  :disabled="isSubmitted"
                  type="button"
                  @click="onChangeEmail"
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
export default {
  data() {
    return {
      modal: null,
      isSubmitted: false,
      updateEmailForm: {
        newEmail: "",
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
        newEmail: { required, email },
      },
    };
  },
  methods: {
    onChangeEmail() {
      console.log(this.v$);
      this.v$.$touch();
      if (!this.v$.$invalid) {
        console.log("update email", this.updateEmailForm.newEmail);
        this.closeModal();
      }
    },
    resetForm() {
      this.v$.$reset();
      this.updateEmailForm = {
        newEmail: "",
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
// .btns_wrap {
//   margin-top: 30px;
//   display: flex;
//   justify-content: center;
// }
.update_email_body {
  padding: 24px !important;
}
.update_email_label {
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  margin-bottom: 18px;
  color: #8f9bb3;
}
</style>
