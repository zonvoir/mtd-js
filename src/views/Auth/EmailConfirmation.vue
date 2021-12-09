<template>
  <div class="register_auth_wrapper">
    <div class="">
      <div class="">
        <div class="main-heading-wrap text-center">
          <h2 class="main-heading p-b-30">Thank You!</h2>
          <div class="verify-subtitle">
            <h6 class="email_verify_message">{{ verificationMessage }}</h6>
          </div>
        </div>
      </div>
      <div class="form-wrapper">
        <form action="">
          <div class="d-grid space_btn3">
            <button
              :disabled="isSubmitted"
              type="submit"
              @click="verifiedNextStep"
              class="btn k_btn_block btn-primary"
            >
              <div
                v-if="isSubmitted"
                class="spinner-border text-light"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <span v-else> Proceed Next Step </span>
            </button>
          </div>
          <div class="im-user flex justify-center">
            <span class="para14"> Already have an account ?</span>
            <router-link target="_blank" class="custom-link" to="/signup/signin"
              >Sign In</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import signupService from "../../Services/SignupService";
// import { useRouter } from 'vue-router';
export default {
  data() {
    return {
      verificationMessage: "",
      isSubmitted: false,
    };
  },
  created() {
    this.getTokenFromUrl();
  },
  methods: {
    verifyEmail(token) {
      signupService
        .verifyEmailToken({ token: token })
        .then((response) => {
          if (response.data.status) {
            sessionStorage.setItem(
              "OiJKV1QiLCJhbGciOiJIUzI1",
              JSON.stringify(response.data.data)
            );
            this.verificationMessage = response.data.message;
            this.$toast.success(response.data.message, {
              position: "bottom-left",
              duration: 3712,
            });
            console.log(response);
          } else {
            this.verificationMessage = response.data.message;
            this.$toast.error(response.data.message, {
              position: "bottom-left",
              duration: 3712,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isSubmitted = false;
        });
      console.log("next step");
    },
    verifiedNextStep() {
      this.isSubmitted = true;
      setTimeout(() => {
        this.setTimeout = false;
      });
      this.$router.push({ name: "signup-career" });
    },

    getTokenFromUrl() {
      if (this.$route.query.token != null) {
        this.verifyEmail(this.$route.query.token);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.email_verify_message {
  font-size: 18px;
  font-weight: 400;
  color: #222b45;
}
.space_btn3 {
  margin-top: 487px;
  margin-bottom: 30px;
}
</style>
