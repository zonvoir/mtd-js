<template>
  <div>
    <div class="row g-0">
      <div class="col-lg-6 col-xl-6 col-md-6">
        <div class="right_scroll">
          <div class="box_container">
            <!-- <p class="">{{ this.activeUrl }}</p> -->
            <!-- <div v-if="this.activeUrl === 'signup'" class="">
              <RegistrationHeader />
            </div> -->
            <!-- brand Logo start -->
            <!-- <div class="brand-logo-wrapper text-center">
              <img
                alt="More Than Digital"
                src="../assets/images/MTGLogo.png"
                class="brand-logo-size"
              />
            </div> -->
            <!-- brand logo Ends  -->

            <div class="">
              <!-- auth pages comes here -->
              <router-view />
              <!-- auth pages ends -->
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xl-6 col-md-6">
        <div class="">
          <div class="right-banner-wrapper">
            <img class="right-banner-img" src="4k.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
// import RegistrationHeader from "./RegisterLayout/RegisterationHeader.vue";
export default {
  data() {
    return {
      // activeUrl:undefined,
    };
  },

  // components: {
  //   // RegistrationHeader,
  // },

  // computed: {
  //   ...mapGetters({
  //     activeUrl: "actviePage",
  //   }),
  // },

  // watch: {
  //   activeUrl: function (oldVal, newVal) {
  //     console.log("acitve url updated", oldVal, newVal);
  //   },
  // },

  // created() {
  //   let activePage = this.$route.path.split("/")[1];
  //   console.log("Verify page1", activePage);
  //   this.$store.dispatch("GET_ACTIVE_PAGE", activePage);
  // },

  // updated() {
  //   // this.forceRerender();
  //   let activePage = this.$route.path.split("/")[1];
  //   console.log("Verify page1", activePage);
  //   this.$store.dispatch("GET_ACTIVE_PAGE", activePage);
  // },

  // methods: {
  //   forceRerender() {
  //     this.componentKey += 1;
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.right-banner-wrapper {
  .right-banner-img {
    width: 100%;
    height: 100vh;
    // object-fit: contain;
  }
}
</style>
