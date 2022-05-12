<template>
  <div>
    <div class="d-flex align-items-center">
      <h4 class="form_title">
        {{ $t("personal_account.form.labels.password") }}
      </h4>
      <div class="m-l-auto">
        <button
          v-if="updatePsw"
          @click="updatePsw = !updatePsw"
          type="button"
          class="
            btn
            mb-0
            text-right
            btn-light
            set_btn_width
            btn-set
            text-upercase
          "
        >
          {{ $t("personal_account.form.buttons.cancel") }}
        </button>
      </div>
    </div>
    <div class="password_wrap m-b-20">
      <!-- 1st screen -->
      <div class="">
        <button
          v-if="!updatePsw"
          @click="changePassword"
          type="button"
          class="btn btn-light set_btn_width btn-set text-upercase"
        >
          {{ $t("personal_account.form.buttons.change") }}
        </button>
      </div>
      <!-- 3rd screen -->
      <!-- password screen start here -->
      <div v-if="updatePsw" class="row">
        <div class="col-lg-6">
          <div class="k_form_group">
            <input
              type="password"
              @blur="v$.personalAccount.old_password.$touch"
              v-model.trim="personalAccount.old_password"
              class="form-control k_inp_field"
              :placeholder="
                $t('personal_account.form.placeholder.old_password')
              "
              :class="{
                'is-invalid': v$.personalAccount.old_password.$error,
              }"
            />
            <div
              v-if="v$.personalAccount.old_password.$error"
              class="invalid-feedback text-left"
            >
              <div class="text-left fs-14">
                {{
                  $t(
                    "personal_account.form.invalid_msgs.Old_Password_must_be_valid"
                  )
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6"></div>
        <div class="col-lg-6">
          <div class="k_form_group">
            <input
              type="password"
              :placeholder="
                $t('personal_account.form.placeholder.new_password')
              "
              @blur="v$.personalAccount.password.$touch"
              v-model.trim="personalAccount.password"
              class="form-control k_inp_field"
              :class="{
                'is-invalid': v$.personalAccount.password.$error,
              }"
            />
            <div
              v-if="v$.personalAccount.password.$error"
              class="invalid-feedback text-left"
            >
              <div class="text-left fs-14">
                {{
                  $t(
                    "personal_account.form.invalid_msgs.New_Password_must_be_valid"
                  )
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6"></div>
        <div class="col-lg-6">
          <div class="k_form_group">
            <input
              type="password"
              :placeholder="
                $t('personal_account.form.placeholder.confirm_password')
              "
              @blur="v$.personalAccount.confirm_password.$touch"
              v-model.trim="personalAccount.confirm_password"
              class="form-control k_inp_field"
              :class="{
                'is-invalid': v$.personalAccount.confirm_password.$error,
              }"
            />
            <div
              v-if="v$.personalAccount.confirm_password.$errors"
              class="invalid-feedback text-left"
            >
              <span
                class="text-left fs-14"
                v-if="
                  v$.personalAccount.confirm_password.sameAsPassword.$invalid
                "
              >
                {{
                  $t(
                    "personal_account.form.invalid_msgs.Password_does_not_matched"
                  )
                }}
              </span>
            </div>
          </div>
        </div>
        <div class="col-lg-6"></div>
      </div>
      <!-- password close here -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updatePsw: false,
    };
  },

  methods: {
    changePassword() {
      this.updatePsw = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
