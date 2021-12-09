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
// import logo from "../assets/images/mtd-logos-rgb_Main-Logo-Size-1-pos.png";
import Header from "../components/Shared/Header.vue";
import Sidebar from "../components/Shared/Sidebar.vue";
export default {
  components: {
    Header,
    Sidebar,
  },

  data() {
    return {
      // logo,
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
