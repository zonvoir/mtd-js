<template>
  <div>
    <div class="main_layout_container">
      <div class="main_layout_sidebar">
        <div class="k-header-wrapprer">
          <Header />
        </div>
        <Sidebar />
      </div>
      <div class="main_layout_body">
        <div v-show="isLoading" class="loading_wrapper">
          <Loader :isLoading="isLoading" />
        </div>

        <div v-show="!isLoading" class="pages_view_container">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Shared/Header.vue";
import Sidebar from "../components/Shared/Sidebar.vue";
import Loader from "../components/Shared/Loader.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    Header,
    Sidebar,
    Loader,
  },
  data() {
    return {
      invitedUserData: JSON.parse(localStorage.getItem("bWFInpvitedbpbUser")),
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      // invitedId: undefined,
      // kLoading: false,
    };
  },

  computed: {
    ...mapGetters({
      isLoading: "loadingStatus",
    }),
  },
  watch: {
    isLoading: function () {
      // console.log(pre, next);
      return this.isLoading;
    },
  },
};
</script>

<style lang="scss" scoped>
.loading_wrapper {
  position: relative;
}
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
