<template>
  <div>
    <div class="main_layout_container">
      <div class="main_layout_sidebar">
        <Sidebar />
        <div class="k-header-wrapprer">
          <Header />
        </div>
      </div>
      <div class="main_layout_body">
        <div class="pages_view_container">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Shared/Header.vue";
import Sidebar from "../components/Shared/Sidebar.vue";
import CommonService from "../Services/CommonService";
export default {
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      invitedUserData: JSON.parse(localStorage.getItem("bWFInpvitedbpbUser")),
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      invitedId: undefined,
    };
  },
  created() {
    this.checkTotkenStatus();
  },
  methods: {
    // check token status
    checkTotkenStatus() {
      CommonService.getTokenValidation({
        auth_token: this.staffData.auth_token,
      }).then((res) => {
        console.log("data res", res);
        // if (res.data.status) {
        //   this.$router.push({ name: "Dashboard" });
        // } else {
        //   this.$router.push({ name: "signup-signin" });
        // }
      });
    },
    onLogout() {
      localStorage.removeItem("bWFpbCI6Inpvb");
      this.$router.push({ name: "signup-signin" });
    },
  },
};
</script>

<style lang="scss" scoped>
.k-header-wrapprer {
  background-color: #ffffff;
  z-index: 99;
  position: fixed;
  top: 0;
  padding-left: 280px;
  width: 100%;
  left: 0;
}
</style>
