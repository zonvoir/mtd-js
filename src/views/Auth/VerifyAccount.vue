<template>
  <div class="register_auth_wrapper">
    <div class="">
      <div class="">
        <div class="main-heading-wrap text-center">
          <h2 class="main-heading p-b-20">
            {{ $t("login.otp_step.verify_account") }}
          </h2>
          <div class="verify-subtitle">
            <h6 class="email_verify_message">
              {{ $t("login.otp_step.verify_acc_para1") }}
              <strong>{{ otpForm.email }}</strong
              ><br />
              {{ $t("login.otp_step.verify_acc_para2") }}
            </h6>
          </div>
        </div>
      </div>
      <div class="form-wrapper">
        <form @submit.prevent="OTPInput" action="">
          <div class="k_form_group">
            <div>
              <CustomOtp
                :classesName="'k_inp_field single_num_inp'"
                :counters="6"
                :onChanges="getChange"
                :onComplete="onCompleted"
                validateType="numeric"
                validateMsg="Please enter the valid OTP code"
              />
            </div>
          </div>
          <div class="d-grid space_btn_acc_ver">
            <button
              :disabled="isSubmitted"
              type="submit"
              class="btn k_btn_block btn-primary"
            >
              <div
                v-if="isStatus"
                class="spinner-border text-light"
                role="status"
              >
                <span class="visually-hidden">{{ $t("login.loading") }}</span>
              </div>
              <span v-else>
                {{ $t("login.otp_step.buttons.verify_account") }}
              </span>
            </button>
          </div>
          <div class="im-user flex justify-center">
            <span class="para14"> {{ $t("login.otp_step.no_account") }}</span>
            <router-link
              target="_blank"
              class="custom-link"
              :to="{ name: 'signup-register' }"
              >{{ $t("login.otp_step.buttons.sign_up") }}</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Modal To check Company Info -->
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
        <div class="modal-body">
          <div class="verify_email">
            <h2 class="verify_title">
              <strong>Please setup your Company first.</strong>
            </h2>
          </div>
          <div class="verify-subtitle q-pb-none">
            <h6 class="">
              You've not setup your company and career information
              <!-- <strong>{{ registerForm.email }}</strong 
              > -->
              <!-- <br />
              Please setup your Company first.
              <br /> -->
              <!-- If you dont't see it please check it in your
              <strong>spam</strong> folder -->
            </h6>
          </div>
        </div>
        <div class="modal_action_btn text-right">
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
  </div>
</template>

<script>
// import { ref } from "vue";
import { Modal } from "bootstrap";
import loginService from "../../Services/LoginService";
import CustomOtp from "../../components/Shared/CustomOtp.vue";
export default {
  components: {
    CustomOtp,
  },
  data() {
    return {
      isStatus: false,
      isSubmitted: true,
      isCompany: undefined,
      isCareer: undefined,
      modal: null,
      logData: JSON.parse(sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1")),
      otpForm: {
        email: "",
        otp: "",
        code: [],
      },
    };
  },
  mounted() {
    this.modal = new Modal(this.$refs.exampleModal);
  },
  created() {
    if (
      sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") == undefined ||
      sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") == null
    ) {
      this.$router.push({ path: "/signup/signin" });
    }
    this.otpForm.email = this.logData;
    this.OTPInput();
  },
  setup() {
    return {};
  },
  methods: {
    onChange() {
      console.log("change event");
    },
    OTPInput() {
      if (this.isSubmitted) {
        return false;
      }
      this.isStatus = true;
      loginService
        .verifyOTP(this.otpForm)
        .then((res) => {
          if (res.data.status) {
            sessionStorage.removeItem("OiJKV1QiLCJhbGciOiJIUzI1");
            localStorage.setItem(
              "bWFpbCI6Inpvb",
              JSON.stringify(res.data.data)
            );
            this.isCareer = res.data.data.is_career_information_setup;
            this.isCompany = res.data.data.is_company_setup;

            console.log(
              "is career",
              this.isCareer,
              "is Company",
              this.isCompany
            );
            if (
              res.data.data.is_career_information_setup &&
              res.data.data.is_company_setup
            ) {
              this.$router.push({ name: "Dashboard" });
            } else {
              this.modal.show();
            }
          } else {
            console.log("success");
            let $th = this;
            if ("error" in res.data) {
              Object.keys(res.data.error).map(function (key) {
                $th.$toast.error(res.data.error[key], {
                  position: "bottom-left",
                  duration: 3712,
                });
              });
            } else {
              $th.$toast.error(res.data.message, {
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
          this.isStatus = false;
          this.isSubmitted = false;
        });
    },
    onCompleted(ev) {
      this.isSubmitted = !ev.valiated;
      this.otpForm.otp = ev.asString;
      this.otpForm.code = ev.lists;
      console.log("completed", ev, this.isSubmitted);
    },

    getChange(ev) {
      this.isSubmitted = !ev.valiated;
      this.otpForm.otp = ev.asString;
      this.otpForm.code = ev.lists;
      console.log("input Change", ev, this.isSubmitted);
    },
    closeModal() {
      console.log(this.isCompany, this.isCareer);
      this.modal.hide();
      this.$router.push({ name: "signup-career" });
      // if (this.isCareer) {

      // } else if (this.isCompany) {
      //   this.$router.push({ name: "signup-company" });
      //   this.modal.hide();
      // } else {
      //   console.log("please Setup Career");
      // }
    },
    formReset() {
      this.v$.$reset();

      this.$router.push({ name: "Dashboard" });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal_action_btn {
  padding: 0 16px 16px 16px;
}
.space_btn_acc_ver {
  padding-top: 384px;
  padding-bottom: 30px;
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
</style>
