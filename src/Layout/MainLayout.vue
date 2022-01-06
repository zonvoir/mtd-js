<template>
  <div>
    <div class="main_layout_container">
      <div class="main_layout_sidebar">
        <Sidebar />
      </div>
      <div class="main_layout_body">
        <div class="k-header-wrapprer">
          <Header />
        </div>
        <div class="pages_view_container">
          <router-view />
          <!-- <p class="m-b-0">Please Complete Company setup first</p>
          <button class="btn btn-primary btn-set">setup Company First</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Shared/Header.vue";
import Sidebar from "../components/Shared/Sidebar.vue";
export default {
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      invitedUserData: JSON.parse(localStorage.getItem("bWFInpvitedbpbUser")),
      invitedId: undefined,
    };
  },

  methods: {
    onLogout() {
      console.log("Logout successfully");
      localStorage.removeItem("bWFpbCI6Inpvb");
      this.$router.push({ name: "signup-signin" });
    },
  },
};
</script>

<style lang="scss" scoped>
.k-header-wrapprer {
  background-color: #ffffff;
  z-index: 999;
}
</style>
