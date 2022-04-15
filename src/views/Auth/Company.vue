<template>
  <div class="">
    <div class="stepper_withlogo">
      <RegistrationHeader />
    </div>
    <router-view />
  </div>
  <!-- Modal -->
</template>

<script>
// import SignupService from "../../Services/SignupService";

import RegistrationHeader from "../../Layout/RegisterLayout/RegisterationHeader.vue";

export default {
  components: {
    RegistrationHeader,
  },
  data() {
    return {
      staffData:
        JSON.parse(sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1")) ||
        JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
    };
  },

  created() {
    let activePage = this.$route.path.split("/")[2];
    this.$store.dispatch("GET_ACTIVE_PAGE", activePage);
  },

  methods: {
    getStepStatus(ev) {
      console.log(ev);
      this.step1Completed = ev.pageStatus;
    },
  },
};
</script>

<style lang="scss" scoped></style>
