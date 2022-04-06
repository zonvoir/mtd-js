<template>
  <div>
    <div class="register_auth_wrapper">
      <div class="">
        <div class="">
          <div class="main-heading-wrap text-center">
            <h2 class="main-heading">Career Information</h2>
          </div>
        </div>
        <div class="">
          <form action="">
            <div class="k_form_group">
              <input
                type="text"
                value="Google.Inc"
                class="form-control k_inp_field"
                placeholder="Company"
              />
            </div>
            <div class="k_form_group">
              <Multiselect
                placeholder="Industry"
                class="form-control k_inp_field k_select_single"
                v-model="value"
                :options="options"
              />
            </div>

            <div class="k_form_group">
              <Multiselect
                placeholder="Department"
                class="form-control k_inp_field k_select_single"
                v-model="value"
                :options="options"
              />
            </div>
            <div class="k_form_group">
              <input
                type="text"
                class="form-control k_inp_field"
                placeholder="Position"
              />
            </div>
            <div class="k_form_group">
              <Multiselect
                placeholder="Seniority Level"
                class="form-control k_inp_field k_select_single"
                v-model="value"
                :options="options"
              />
            </div>
            <div class="k_form_group">
              <input
                type="email"
                class="form-control k_inp_field"
                placeholder="Confirm Password"
              />
            </div>

            <div class="d-grid space_btn">
              <button class="btn k_btn_block btn-primary" type="button">
                Done
              </button>
            </div>
            <div class="im-user flex justify-center">
              <span class="para14"> Already have an account?</span>
              <router-link
                target="_blank"
                class="custom-link"
                to="/signup/signin"
                >Sign In</router-link
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
export default {
  data() {
    return {
      value: null,
      options: ["Batman", "Robin", "Joker"],
    };
  },
  components: {
    Multiselect,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
