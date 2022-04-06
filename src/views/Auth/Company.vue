<template>
  <div class="">
    <router-view />
    <!-- <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive> -->
    <!-- <div v-if="loading">
      <div v-if="!step1Completed" class="">
        <CompanyStep1 @stepStatus="getStepStatus" />
      </div>

      <div v-else class="">
        <CompanyStep2 />
      </div>
    </div> -->
  </div>
  <!-- Modal -->
</template>

<script>
import SignupService from "../../Services/SignupService";
// import CompanyStep1 from "./Components/CompanyStep1.vue";
// import CompanyStep2 from "./Components/CompanyStep2.vue";

export default {
  components: {
    // CompanyStep1,
    // CompanyStep2,
  },
  data() {
    return {
      step1Completed: false,
      loading: false,
      // step2Completed: false,
      currentComponent: "CompanyStepOne",
      staffData:
        JSON.parse(sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1")) ||
        JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
    };
  },
  watch: {
    step1Completed: function () {
      this.checkCompany();
    },
  },

  beforeCreate() {
    if (this.staffData != null) {
      SignupService.checkCompany({
        auth_token: this.staffData.auth_token,
      }).then((resp) => {
        if (resp.data.status) {
          if (
            !resp.data.data.is_first_step_complete &&
            !resp.data.data.is_second_step_complete
          ) {
            this.step1Completed = false;
          }
          // this.updatePageStatus();
          // this.$router.push({ name: "Dashboard" });
        }
      });
    }
  },
  created() {
    let activePage = this.$route.path.split("/")[2];
    this.$store.dispatch("GET_ACTIVE_PAGE", activePage);
    this.checkCompany();
    if (
      sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") == undefined ||
      sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") == null ||
      sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1") == ""
    ) {
      if (
        localStorage.getItem("bWFpbCI6Inpvb") == undefined ||
        localStorage.getItem("bWFpbCI6Inpvb") == null ||
        localStorage.getItem("bWFpbCI6Inpvb") == ""
      ) {
        this.$router.push({ name: "signup-signin" });
      } else {
        this.$router.push({ name: "signup-company" }); // now 3f
      }
    }
  },

  methods: {
    getStepStatus(ev) {
      console.log(ev);
      this.step1Completed = ev.pageStatus;
    },

    checkCompany() {
      if (this.staffData != null) {
        SignupService.checkCompany({
          auth_token: this.staffData.auth_token,
        }).then((resp) => {
          if (resp.data.status) {
            console.log("dta", resp.data.data);
            if (
              !resp.data.data.is_first_step_complete &&
              !resp.data.data.is_second_step_complete
            ) {
              this.$router.push({ name: "company-step-one" });
            } else if (!resp.data.data.is_first_step_complete) {
              this.$router.push({ name: "company-step-one" });
            } else if (!resp.data.data.is_second_step_complete) {
              this.$router.push({ name: "company-step-two" });
            } else {
              this.$router.push({ name: "signin-verify-account" });
            }
            this.loading = true;
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
