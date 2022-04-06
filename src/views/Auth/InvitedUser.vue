<template>
  <div class="register_auth_wrapper">
    <div class="">
      <div class="">
        <div class="main-heading-wrap text-center">
          <h2 class="main-heading">Create an account</h2>
        </div>
      </div>
      <div class="">
        <form action="">
          <div class="k_form_group">
            <input
              type="text"
              class="form-control k_inp_field"
              placeholder="Firstname"
            />
          </div>
          <div class="k_form_group">
            <input
              type="text"
              class="form-control k_inp_field"
              placeholder="Lastname"
            />
          </div>
          <div class="k_form_group">
            <input
              type="text"
              class="form-control k_inp_field"
              placeholder="Username"
            />
          </div>
          <div class="k_form_group">
            <input
              type="email"
              value="johndoe23@gmail.com"
              class="form-control k_inp_field"
              placeholder="Email"
            />
          </div>
          <div class="k_form_group psw_visibilty">
            <input
              type="password"
              class="form-control k_inp_field"
              placeholder="Password"
            />
            <span class="visibilty_btn">
              <button
                @click="switchVisibility"
                type="button"
                class="btn eye_btn btn-white"
              >
                <img src="../../assets/images/icons/eye.svg" class="eye_icon" />
              </button>
            </span>
          </div>
          <div class="k_form_group psw_visibilty">
            <input
              type="password"
              class="form-control k_inp_field"
              placeholder="Confirm Password"
            />
            <span class="visibilty_btn">
              <button
                @click="switchVisibility"
                type="button"
                class="btn eye_btn btn-white"
              >
                <img src="../../assets/images/icons/eye.svg" class="eye_icon" />
              </button>
            </span>
          </div>
          <div class="k_form_group">
            <div class="check_box_wrapper">
              <label class="k_checkbox check_lable">
                I agree with the
                <a
                  target="_blank"
                  class="custom-link"
                  href="https://www.w3schools.com"
                  >Terms of Service!</a
                >
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div class="k_form_group">
            <div class="check_box_wrapper">
              <label class="k_checkbox check_lable">
                I have read and accept the
                <a
                  target="_blank"
                  class="custom-link"
                  href="https://www.w3schools.com"
                  >Privacy Policy!</a
                >
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div class="d-grid space_btn">
            <button
              class="btn k_btn_block btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              type="button"
            >
              Create Account
            </button>
          </div>
          <div class="im-user flex justify-center">
            <span class="para14"> Already have an account?</span>
            <router-link target="_blank" class="custom-link" to="/signup/signin"
              >Sign In</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
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
              We've sent you a email verification link to
              <strong>peterj234@gmail.com</strong><br />
              Please click that link to verify your email address.
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
            class="btn k_btnfs14_w700 btn-primary"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- <microsoft-windows></microsoft-windows> -->
</template>
<script>
// import { MicrosoftWindows } from "mdue";
import { ref } from "vue";
export default {
  components: {
    // MicrosoftWindows,
  },
  data() {
    return {
      visibilityIcon: "visibility",
      passwordFieldType: "password",
      visibility: false,
    };
  },
  setup() {
    return {
      isPwd: ref(true),
    };
  },
  methods: {
    switchVisibility() {
      this.visibility = !this.visibility;
      this.passwordFieldType = this.visibility ? "text" : "password";
      this.visibilityIcon = this.visibility ? "eye-off.svg" : "eye.svg";
    },
  },
};
</script>

<style lang="scss" scoped>
// .space_btn {
//   padding-top: 100px;
//   padding-bottom: 30px;
// }

.modal_action_btn {
  text-align: right;
  padding: 0 16px 16px 16px;
}
.verify_email {
  .verify_title {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 40px;
    color: #222b45;
  }
}

.verify-subtitle {
  padding-bottom: 0 !important;
}
</style>
