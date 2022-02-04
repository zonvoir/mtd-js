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
  created() {},
  methods: {
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
