<template>
  <div class="main_layout_container"></div>
  <div class="error_message_wrapper">
    <div class="gap_1">
      <div class="img_wrap">
        <img src="no_internet.png" alt="" />
      </div>
    </div>

    <div class="gap_1">
      <p class="error_message">
        No internet connection found please check your internet connection
      </p>
    </div>
    <div class="gap_1">
      <button
        @click="$router.push({ name: 'Dashboard' })"
        class="btn btn-set btn-primary"
      >
        Go Back To Home
      </button>
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
.main_layout_container {
  position: relative;
  width: 100%;
  height: 100%;
}
.error_message_wrapper {
  position: absolute;
  text-align: center;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.error_message {
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  color: #222b45;
}
.error_title {
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  color: #222b45;
  text-transform: capitalize;
}
.error_code {
  font-style: normal;
  font-weight: 600;
  font-size: 8rem;
  margin-bottom: 0;
  margin-bottom: 2rem;

  color: #222b45;
}
.gap {
  margin-bottom: 2rem;
}
</style>
