<template>
  <div>
    <div class="preloader">
      <img src="K_Icons/spinner-logo.png" border="0" />
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
.preloader {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 99;
  text-align: center;
  img {
    width: 100px;
    height: 100px;
    background-size: contain;
    animation: spin 1s linear infinite;
    position: absolute;
    left: 0;
    right: 0;
    top: 38%;
    bottom: 0;
    margin: 0 auto;
  }
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
