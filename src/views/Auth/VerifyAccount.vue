<template>
  <div class="register_auth_wrapper">
    <div class="">
      <div class="">
        <div class="main-heading-wrap text-center">
          <h2 class="main-heading p-b-20">Verify your account</h2>
          <div class="verify-subtitle">
            <h6 class="email_verify_message">
              We've sent you a six-digit confirmation code to
              <strong>{{ otpForm.email }}</strong
              ><br />
              Please enter it below to confirm your email address.
            </h6>
          </div>
        </div>
      </div>
      <div class="form-wrapper">
        <form @submit.prevent="OTPInput" action="">
          <div class="k_form_group">
            <div>
              <!-- <input
                v-for="index in Array(6).keys()"
                :key="index"
                type="text"
                v-model="otpForm.code[index]"
                maxlength="1"
                minlength="0"
                class="k_inp_field single_num_inp"
              /> -->
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
                <span class="visually-hidden">Loading...</span>
              </div>
              <span v-else> Verify Account </span>
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
      logData: JSON.parse(sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1")),
      otpForm: {
        email: "",
        otp: "",
        code: [],
      },
    };
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
        .then((response) => {
          if (response.data.status) {
            localStorage.setItem(
              "bWFpbCI6Inpvb",
              JSON.stringify(response.data.data)
            );

            this.$router.push({ name: "Dashboard" });
            // let data = localStorage.getItem("staffData");
            // console.log("session Staff data " + data);
            // this.$q.notify({
            //   color: "green-4",
            //   textColor: "white",
            //   icon: "cloud_done",
            //   message: response.data.message,
            // });
            sessionStorage.removeItem("OiJKV1QiLCJhbGciOiJIUzI1");
          } else {
            // let $th = this;
            // $th.$q.notify({
            //   color: "red-5",
            //   textColor: "white",
            //   icon: "warning",
            //   message: response.data.message,
            // });
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
    formReset() {
      this.v$.$reset();

      this.$router.push({ name: "Dashboard" });
    },
  },
};
</script>

<style lang="scss" scoped>
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
