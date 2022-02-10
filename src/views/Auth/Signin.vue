<template>
  <div class="register_auth_wrapper">
    <div class="">
      <div class="">
        <div class="main-heading-wrap text-center">
          <h2 class="main-heading">
            {{ $t("login.email_step.Sign_In") }}
          </h2>
        </div>
      </div>
      <div class="form-wrapper">
        <form @submit.prevent="onSubmit" action="">
          <div class="k_form_group">
            <input
              :readonly="invitedId"
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
          <div class="im-user text-center flex justify-center">
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
</template>

<script>
import { required, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import loginService from "../../Services/LoginService";
import { mapGetters } from "vuex";
// import CommonService from "../../Services/CommonService";
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
  mounted() {
    this.invitedUserData = JSON.parse(
      localStorage.getItem("bWFInpvitedbpbUser")
    );
    if (this.invitedUserData && Object.keys(this.invitedUserData).length != 0) {
      this.emailVerify.email = this.invitedUserData.email;
      // this.emailVerify.invitation_id = this.invitedUserData.invitation_id;
      console.log(
        "let there is invitaation id",
        this.invitedUserData.invitation_id
      );
      if (this.invitedUserData.invitation_id) {
        this.invitedId = true;
        console.log("let there is invitaation id", this.invitedId);
      }
    }
    // console.log("user is email ", invitedStaff.email);
  },
  created() {
    let invitedStaffData = this.$route.query;
    console.log(invitedStaffData);
    //localStorage.removeItem("bWFpbCI6Inpvb"); //new 9f
    // if (
    //   invitedStaffData != null ||
    //   invitedStaffData != undefined ||
    //   invitedStaffData != ""
    // )
    if (invitedStaffData && Object.keys(invitedStaffData).length != 0) {
      // console.log("invited user is awailble", invitedStaffData);
      localStorage.setItem(
        "bWFInpvitedbpbUser",
        JSON.stringify(invitedStaffData)
      );
    }
    // if (
    //   this.staffInfo === null ||
    //   this.staffInfo === undefined ||
    //   this.staffInfo === ""
    // ) {
    //   this.$router.push({ name: "signup-signin" });
    //   console.log("staff information is null");
    // } else {
    //   CommonService.getTokenValidation({
    //     auth_token: this.staffInfo.auth_token,
    //   }).then((res) => {
    //     if (res.data.status) {
    //       console.log("response", res);
    //       // this.$router.push({ name: "Dashboard" });
    //     } else {
    //       // this.$router.push({ name: "signup-signin" });
    //       console.log("staff information is", this.staffInfo.auth_token);
    //     }
    //   });
    // }
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
    // invitaionAccepted() {
    //   CompanyService.acceptInvitation({
    //     auth_token: this.staffInfo.auth_token,
    //     invitation_id: this.invitedId,
    //   }).then((res) => {
    //     if (res.data.status) {
    //       this.$router.push({ name: "Dashboard" });
    //       console.log("invitainon accepted successfully");
    //     } else {
    //       console.log("there is some error in in invitaion acceptance");
    //       this.$router.push({ name: "signup-signin" });
    //     }
    //   });
    // },
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
