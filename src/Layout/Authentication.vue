<template>
  <div>
    <div class="row g-0">
      <div class="col-lg-6 col-xl-6 col-md-6">
        <div class="right_scroll">
          <div class="box_container">
            <!-- <p class="">{{ this.currentUrl }}</p> -->
            <div v-if="this.currentUrl === 'signup'" class="">
              <RegistrationHeader />
            </div>
            <!-- brand Logo start -->
            <div v-else class="brand-logo-wrapper text-center">
              <img
                alt="More Than Digital"
                src="../assets/images/MTGLogo.png"
                class="brand-logo-size"
              />
            </div>
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
import RegistrationHeader from "./RegisterLayout/RegisterationHeader.vue";
export default {
  data() {
    return {};
  },

  components: {
    RegistrationHeader,
  },

  created() {
    let url = this.$route.path;
    this.currentUrl = url.split("/")[1];
    console.log("current url kk", this.currentUrl);
  },
};
</script>

<style lang="scss" scoped>
.box_container {
  margin: 1rem 92px;
  position: relative;
}
.right-banner-wrapper {
  .right-banner-img {
    width: 100%;
    height: 100vh;
    // object-fit: contain;
  }
}
</style>
