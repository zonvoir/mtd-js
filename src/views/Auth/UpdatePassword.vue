<template>
  <div class="register_auth_wrapper">
    <div class="">
      <div class="">
        <div class="main-heading-wrap text-center">
          <h2 class="main-heading">Update your password</h2>
          <h2 class="main-heading">
            An email has been sent to your email! Click the link to reset it.
          </h2>
        </div>
      </div>
      <div class="form-wrapper">
        <form action="">
          <div class="k_form_group">
            <input
              type="email"
              class="form-control k_inp_field"
              placeholder="Email Address"
            />
          </div>

          <div class="d-grid space_btn2">
            <button class="btn k_btn_block btn-primary" type="button">
              RESET PASSWORD
            </button>
          </div>
          <div class="im-user flex justify-center">
            <span class="para14"> No account yet ?</span>
            <router-link target="_blank" class="custom-link" to="/signup/signin"
              >Sign Up</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
