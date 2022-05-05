<template>
  <router-view />
</template>
<script>
import CommonService from "./Services/CommonService";
import errorhandler from "./utils/Error";

export default {
  components: {},
  data() {
    return {
      answerValue: "",
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
    };
  },

  beforeCreate() {
    this.$store.dispatch("GET_ALL_DEAFULT_ROLES");
  },
  created() {
    this.checkTotkenStatus();
  },

  methods: {
    // check token status
    checkTotkenStatus() {
      if (
        this.staffData != null &&
        this.staffData.auth_token != null &&
        this.staffData.auth_token != undefined &&
        Object.keys(this.staffData).length != 0
      ) {
        CommonService.getTokenValidation({
          auth_token: this.staffData.auth_token,
        })
          .then((res) => {
            if (!res.data.status) {
              errorhandler(res, this);
              this.$router.push({ name: "signup-signin" });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800&display=swap");
#app {
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
