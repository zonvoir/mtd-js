<template>
  <div class="">
    <div class="custom_brand_logo">
      <MainLogo />
    </div>
    <div class="register_auth_wrapper">
      <div class="">
        <div class="">
          <div class="main-heading-wrap text-center">
            <h2 class="main-heading p-b-10">
              {{ $t("login.otp_step.verify_account") }}
            </h2>
            <div class="verify-subtitle">
              <h6 class="email_verify_message">
                {{ $t("login.otp_step.verify_acc_para1") }}
                <strong class="m-l-4">{{ otpForm.email }}</strong
                ><br />
              </h6>
              <div v-if="canUpdateEmail" class="">
                <UpdateEmail ref="change_email" @changeEmail="changeEmail">
                  <template v-slot:change-email>
                    <h5 class="email_update_para">
                      {{ $t("login.otp_step.verify_acc_email_change") }}
                      <a @click="updateEmailHere" class="custom-link">
                        {{ $t("login.otp_step.email_change_here") }}
                      </a>
                    </h5>
                  </template>
                </UpdateEmail>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <h6 class="email_verify_message">
            {{ $t("login.otp_step.verify_acc_para2") }}
          </h6>
        </div>
        <div class="">
          <form action="">
            <div class="">
              <div @keyup="enterClicked" class="text_center m-t-20">
                <v-otp-input
                  class="otp_componnent"
                  ref="otpInput"
                  input-classes="otp-input  "
                  separator=""
                  :num-inputs="6"
                  :should-auto-focus="true"
                  :is-input-num="true"
                  :conditionalClass="['one', 'two', 'three', 'four']"
                  :placeholder="['', '', '', '', '', '']"
                  @on-change="getChange"
                  @on-complete="onCompleted"
                />
                <span v-if="isValidOTP" class="text-danger">{{
                  $t("login.otp_step.form.invalid_msgs.otp_is_invalid")
                }}</span>
                <!-- <CustomOtp
                  :classesName="'k_inp_field single_num_inp'"
                  :onChanges="getChange"
                  :counters="6"
                  ref="otpData"
                  :onComplete="onCompleted"
                  @onPaste="handleOnPaste"
                  validateType="numeric"
                  :validateMsg="
                    $t('login.otp_step.form.invalid_msgs.otp_is_invalid')
                  "
                /> -->
              </div>
            </div>
            <div class="space_btn_acc_ver">
              <div class="d-grid">
                <button
                  v-if="!canUpdateEmail"
                  :disabled="isValidOTP == undefined || isValidOTP"
                  type="button"
                  @click="OTPInput"
                  class="btn k_btn_block btn-primary"
                >
                  <div
                    v-if="isStatus"
                    class="spinner-border text-light"
                    role="status"
                  >
                    <span class="visually-hidden">{{
                      $t("login.loading")
                    }}</span>
                  </div>
                  <span v-else>
                    {{ $t("login.otp_step.buttons.verify_account") }}
                  </span>
                </button>
                <button
                  v-else
                  :disabled="isValidOTP == undefined || isValidOTP"
                  type="button"
                  @click="OTPForRegistration"
                  class="btn k_btn_block btn-primary"
                >
                  <div
                    v-if="isStatus"
                    class="spinner-border text-light"
                    role="status"
                  >
                    <span class="visually-hidden">{{
                      $t("login.loading")
                    }}</span>
                  </div>
                  <span v-else>
                    {{ $t("login.otp_step.buttons.verify_account") }}
                  </span>
                </button>
              </div>

              <div class="im-user flex justify-center">
                <span class="para14">{{
                  $t("login.otp_step.already_account")
                }}</span>
                <router-link
                  target="_blank"
                  class="custom-link"
                  :to="{ name: 'signup-signin' }"
                  >{{ $t("login.otp_step.buttons.sign_in") }}</router-link
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal To check Company Info -->
  <div
    class="modal custom_modal_email fade"
    id="exampleModal"
    ref="exampleModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content set_modal_width">
        <div class="modal-body update_email_body">
          <div class="verify_email">
            <h2 class="verify_title">
              <strong>Please setup your company first.</strong>
            </h2>
          </div>
          <div class="verify-subtitle q-pb-none">
            <h6 class="">You've not setup your company</h6>
          </div>
        </div>
        <div class="modal_action_btn text-center">
          <button
            type="button"
            @click="closeModal"
            class="btn default_padding k_btnfs14_w700 btn-primary"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
import { Modal } from "bootstrap";
import loginService from "../../Services/LoginService";
// import CustomOtp from "../../components/Shared/CustomOtp.vue";
import UpdateEmail from "./Components/UpdateEmail.vue";
// import CompanyService from "../../Services/Company/CompanyService";
import MainLogo from "../../components/Shared/MainLogo.vue";
import VOtpInput from "vue3-otp-input";

import { mapGetters } from "vuex";
import errorhandler from "../../utils/Error";
export default {
  components: {
    // CustomOtp,
    UpdateEmail,
    MainLogo,
    "v-otp-input": VOtpInput,
  },
  data() {
    return {
      isValidOTP: undefined, //  replace this with isSubmitted
      canUpdateEmail: false,
      isStatus: false,
      isCompanyStep1: undefined,
      isCompanyStep2: undefined,
      isCareer: undefined,
      modal: null,
      UserSavedData: JSON.parse(
        sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1")
      ),
      logData: JSON.parse(sessionStorage.getItem("QiLC1IUzI1JhbGciOiKV")),
      invitedUserData: JSON.parse(localStorage.getItem("bWFInpvitedbpbUser")),
      otpForm: {
        email: "",
        stay_signed_in: "",
        otp: "",
        invitation_id: undefined,
        code: [],
      },
    };
  },

  watch: {
    "UserSavedData.email": function (val) {
      console.log(val);
      this.otpForm.email = val;
    },
  },

  computed: {
    ...mapGetters({
      staffInfo: "staffData",
    }),
  },

  mounted() {
    this.modal = new Modal(this.$refs.exampleModal);
    if (
      this.invitedUserData &&
      Object.keys(this.invitedUserData).length != 0 &&
      this.invitedUserData.invitation_id != ""
    ) {
      this.otpForm.invitation_id = +this.invitedUserData.invitation_id;
      console.log("invitation id", +this.invitedUserData.invitation_id);
    }
  },

  created() {
    if (this.UserSavedData && Object.keys(this.UserSavedData).length) {
      this.canUpdateEmail = true;
      if (
        this.invitedUserData &&
        Object.keys(this.invitedUserData).length != 0 &&
        this.invitedUserData.invitation_id != ""
      ) {
        this.otpForm.invitation_id = +this.invitedUserData.invitation_id;
      }
      this.otpForm.email = this.UserSavedData.email;
      this.otpForm.stay_signed_in = undefined;
      this.otpForm.auth_token = this.UserSavedData.auth_token;
    } else if (this.logData && Object.keys(this.logData).length) {
      this.canUpdateEmail = false;
      this.otpForm.email = this.logData.email;
      this.otpForm.stay_signed_in = this.logData.stay_signIn;
    } else {
      let activePage = this.$route.path.split("/")[1];
      this.$store.dispatch("GET_ACTIVE_PAGE", activePage);
      this.$router.push({ name: "signup-signin" });
    }
  },

  setup() {
    return {};
  },

  methods: {
    onChange() {
      console.log("change event");
    },
    isInvitedUser() {
      console.log("this is invited user");
      this.$router.push({ name: "link-company-account" });
    },
    handleOnPaste(ev) {
      console.log(ev);
    },
    updateEmailHere() {
      this.$refs.change_email.modal.show();
    },

    // OTP For Login
    OTPInput() {
      if (this.isValidOTP == undefined || this.isValidOTP) {
        return false;
      }
      this.isStatus = true;
      loginService
        .verifyOTP(this.otpForm)
        .then((res) => {
          if (res.data.status) {
            console.log("otp response", res.data.data);
            sessionStorage.removeItem("QiLC1IUzI1JhbGciOiKV");
            sessionStorage.removeItem("OiJKV1QiLCJhbGciOiJIUzI1");
            localStorage.setItem(
              "bWFpbCI6Inpvb",
              JSON.stringify(res.data.data)
            );
            let user = JSON.parse(localStorage.getItem("bWFpbCI6Inpvb"));
            this.$store.dispatch("SET_STAFF_DATA_LOCAL", user);
            if (
              this.invitedUserData &&
              Object.keys(this.invitedUserData).length != 0 &&
              Object.keys(user).length != 0
            ) {
              this.$router.push({ name: "link-company-account" });
            } else {
              this.isCareer = res.data.data.is_career_information_setup;

              this.isCompanyStep1 = res.data.data.is_first_step_complete;
              this.isCompanyStep2 = res.data.data.is_second_step_complete;

              if (
                res.data.data.is_career_information_setup &&
                res.data.data.is_first_step_complete &&
                res.data.data.is_second_step_complete
              ) {
                this.$router.push({ name: "Dashboard" });
                if (this.staffInfo && Object.keys(this.staffInfo).length != 0) {
                  this.invitaionAccepted();
                }
              } else {
                this.modal.show();
              }
            }
          } else {
            errorhandler(res, this);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isStatus = false;
          this.isValidOTP = true;
          // this.isSubmitted = false;
        });
    },

    // OTP For Registration
    OTPForRegistration() {
      console.log("opt form for Registration", this.otpForm);
      // if (this.isValidOTP) {
      //   return false;
      // }
      if (this.isValidOTP == undefined || this.isValidOTP) {
        return false;
      }
      this.isStatus = true;
      loginService
        .registrationOTPVerification(this.otpForm)
        .then((res) => {
          if (res.data.status) {
            console.log("otp response", res.data.data);
            sessionStorage.removeItem("OiJKV1QiLCJhbGciOiJIUzI1");
            localStorage.setItem(
              "bWFpbCI6Inpvb",
              JSON.stringify(res.data.data)
            );
            sessionStorage.removeItem("QiLC1IUzI1JhbGciOiKV");
            sessionStorage.removeItem("OiJKV1QiLCJhbGciOiJIUzI1");
            let user = JSON.parse(localStorage.getItem("bWFpbCI6Inpvb"));
            this.$store.dispatch("SET_STAFF_DATA_LOCAL", user);
            if (
              this.invitedUserData &&
              Object.keys(this.invitedUserData).length != 0 &&
              Object.keys(user).length != 0
            ) {
              this.$router.push({ name: "link-company-account" });
            } else {
              this.isCareer = res.data.data.is_career_information_setup;
              this.isCompanyStep1 = res.data.data.is_first_step_complete;
              this.isCompanyStep2 = res.data.data.is_second_step_complete;

              if (
                res.data.data.is_career_information_setup &&
                res.data.data.is_first_step_complete &&
                res.data.data.is_second_step_complete
              ) {
                this.$router.push({ name: "Dashboard" });
                if (this.staffInfo && Object.keys(this.staffInfo).length != 0) {
                  this.invitaionAccepted();
                }
              } else {
                this.modal.show();
              }
            }
          } else {
            errorhandler(res, this);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isStatus = false;
          this.isValidOTP = true;
        });
    },

    onCompleted(ev) {
      // this.isValidOTP = !ev.valiated;
      // this.otpForm.otp = ev.asString;
      // this.otpForm.code = ev.lists;
      this.otpForm.otp = ev;
      this.isValidOTP = false;
    },

    getChange() {
      // this.isValidOTP = !ev.valiated;
      // this.otpForm.otp = ev.asString;
      // this.otpForm.code = ev.lists;
      this.isValidOTP = true;
    },

    changeEmail(val) {
      console.log(val);
      this.otpForm.email = val;
    },

    enterClicked(ev) {
      if (
        this.isValidOTP !== undefined &&
        !this.isValidOTP &&
        ev.keyCode === 13
      ) {
        if (this.canUpdateEmail) {
          this.OTPForRegistration();
        } else {
          this.OTPInput();
        }
      } else {
        return;
      }
    },

    closeModal() {
      console.log(this.isCompany, this.isCareer);
      this.modal.hide();
      if (this.isCareer == false) {
        this.$router.push({ name: "signup-career" });
      } else if (this.isCompanyStep1 == false) {
        this.$router.push({ name: "company-step-one" });
      } else if (this.isCompanyStep2 == false) {
        this.$router.push({ name: "company-step-two" });
      } else {
        this.$router.push({ name: "Dashboard" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.otp_componnent {
  justify-content: center;
  input {
    margin-right: 15px !important;
    &:last-child {
      // margin-right: ;
    }
  }
}
.modal_action_btn {
  padding: 0 16px 16px 16px;
}
.text_center {
  text-align: center;
}

.email_verify_message {
  font-size: 18px;
  font-weight: 400;
  color: #222b45;
}
.opt_wrap {
  display: flex;
  align-items: center;
  margin: 10px;
}
.single_num_inp {
  font-size: 24px;
  font-weight: 600;
  line-height: 20px;
  padding: 10px !important;
  width: 55px;
  margin: 10px;
  text-align: center;
  color: #000000;
}
.verify_email {
  .verify_title {
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 40px;
    color: #222b45;
  }
}

.verify-subtitle {
  padding-bottom: 0 !important;
}
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  &.error {
    border: 1px solid red !important;
  }
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.email_update_para {
  font-weight: 400;
  font-size: 18px;
  line-height: 20px;
  color: #222b45;
  margin-bottom: 0;
  .custom-link {
    font-size: 16px;
  }
}
.custom_brand_logo {
  margin-bottom: 2rem;
}
</style>
