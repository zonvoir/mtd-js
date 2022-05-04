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
              {{ $t("login.email_step.Sign_In") }}
            </h2>
          </div>
        </div>
        <div class="">
          <form @submit.prevent="onSubmit" action="">
            <div class="k_form_group position-relative">
              <input
                :readonly="invitedId"
                type="email"
                ref="focusInp"
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
                  {{
                    $t("login.email_step.form.invalid_msgs.email_is_required")
                  }}
                </span>

                <span
                  class="text-left fs-14"
                  v-if="v$.emailVerify.email.email.$invalid"
                >
                  {{
                    $t("login.email_step.form.invalid_msgs.Email_is_invalid")
                  }}
                </span>
              </div>
              <div class="error_data_wrap">
                <div class="forgot_action_wrap m-l-auto">
                  <router-link
                    target="_blank"
                    class="muted_link"
                    :to="{ name: 'signin-update-password' }"
                  >
                    {{ $t("login.email_step.forgot_password") }}</router-link
                  >
                </div>
              </div>
            </div>
            <div class="space_btn2">
              <div class="d-grid">
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
                    <span class="visually-hidden">{{
                      $t("login.loading")
                    }}</span>
                  </div>
                  <span v-else>
                    {{ $t("login.email_step.buttons.sign_in") }}
                  </span>
                </button>
              </div>
              <div class="im-user text-center flex justify-center">
                <span class="para14">
                  {{ $t("login.email_step.no_account") }}</span
                >
                <router-link
                  target="_blank"
                  class="custom-link"
                  :to="{ name: 'signup-register' }"
                  >{{ $t("login.email_step.buttons.sign_up") }}</router-link
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
import { required, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import loginService from "../../Services/LoginService";
import { mapGetters } from "vuex";
import MainLogo from "../../components/Shared/MainLogo.vue";
import errorhandler from "../../utils/Error";
export default {
  data() {
    return {
      invitedId: false,
      isSubmitted: false,
      emailVerify: {
        email: "",
      },
    };
  },

  computed: {
    ...mapGetters({
      staffInfo: "staffData",
    }),
  },
  components: {
    MainLogo,
  },

  mounted() {
    this.$refs.focusInp.focus();
    this.invitedUserData = JSON.parse(
      localStorage.getItem("bWFInpvitedbpbUser")
    );
    if (this.invitedUserData && Object.keys(this.invitedUserData).length != 0) {
      this.emailVerify.email = this.invitedUserData.email;

      console.log(
        "let there is invitaation id",
        this.invitedUserData.invitation_id
      );
      if (this.invitedUserData.invitation_id) {
        this.invitedId = true;
        console.log("let there is invitaation id", this.invitedId);
      }
    }
  },
  beforeCreate() {
    localStorage.removeItem("bWFInpvitedbpbUser");
    // localStorage.removeItem("bWFpbCI6Inpvb");
    localStorage.removeItem("OiJKV1QiLCJhbGciOiJIUzI1");
  },

  created() {
    let activePage = this.$route.path.split("/")[2];
    this.$store.dispatch("GET_ACTIVE_PAGE", activePage);
    let invitedStaffData = this.$route.query;
    if (invitedStaffData && Object.keys(invitedStaffData).length != 0) {
      localStorage.setItem(
        "bWFInpvitedbpbUser",
        JSON.stringify(invitedStaffData)
      );
    }
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
        loginService
          .emailVerifcationLogin(this.emailVerify)
          .then((response) => {
            if (response.data.status) {
              let data = {
                email: response.data.email,
              };
              sessionStorage.setItem(
                "QiLC1IUzI1JhbGciOiKV",
                JSON.stringify(data)
              );
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
      this.emailVerify = {
        email: "",
      };
      this.$router.push({ name: "signin-password" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
