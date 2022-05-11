<template>
  <div>
    <div class="row g-0">
      <div class="col-lg-6 col-xl-6 col-md-6">
        <div class="right_scroll">
          <div class="box_container">
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
export default {
  data() {
    return {};
  },
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
