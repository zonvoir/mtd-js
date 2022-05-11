<template>
  <div v-if="isLoading" class="loader_container">
    <div class="spiner_wrap">
      <img
        id="loading"
        src="K_Icons/spinner-logo.png"
        class="custom_spinner"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["isLoading"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
#loading {
  -webkit-animation: rotation 0.8s infinite linear;
}

.loader_container {
  position: relative;
  background-color: #d2ced117;
  height: 90vh;
  //   width: 100%;
  padding: 25px 28px 0 20px;
  margin-top: 68px !important;
  z-index: 1055;
  overflow: hidden;
}

@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
  }
}
.spiner_wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.custom_spinner {
  width: 3rem;
}
</style>
