<template>
  <router-view />
</template>
<script>
import CommonService from "./Services/CommonService";
import errorhandler from "./utils/Error";

export default {
  data() {
    return {
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
    };
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
        console.log("this is condtion is true");
        CommonService.getTokenValidation({
          auth_token: this.staffData.auth_token,
        })
          .then((res) => {
            if (res.data.status) {
              console.log("data res", res.data);
            } else {
              errorhandler(res, this);
              this.$router.push({ name: "signup-signin" });
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            console.log("always run");
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

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
.remove_sroll {
  overflow: hidden;
  position: relative;
  &::after {
    content: "";
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 99;
    background-color: #1d1d1d6b;
  }
}
body::-webkit-scrollbar {
  width: 8px;
}

// / Track /
body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 0px;
}

// / Handle /
body::-webkit-scrollbar-thumb {
  background-color: #aab4c5bd !important;
  border-radius: 10px;
}

// / Handle on hover /
body::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}
</style>
