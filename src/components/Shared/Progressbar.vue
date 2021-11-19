<template>
  <div class="progess_wrappwer">
    <p class="m-b-0 progres_value"><span>45%</span> to complete</p>
    <button class="btn btn-transaprent zp-0 m-l-auto">
      <img src="K_Icons/cancel.svg" alt="" class="cancel_icon" />
    </button>
  </div>
  <div class="progress k_progress_wrap">
    <div
      class="progress-bar k_progress_bar"
      role="progressbar"
      style="width: 25%"
      aria-valuenow="25"
      aria-valuemin="0"
      aria-valuemax="100"
    ></div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.progess_wrappwer {
  display: flex;
  align-items: center;
  //   margin-bottom: 2px;
}
.progres_value {
  font-size: 15px;
  font-weight: 600;
  color: #8f9bb3;
  line-height: 16px;
}
.k_progress_bar {
  height: 6px;
  background-color: #7900d8;
  border-radius: 4px;
}
.k_progress_wrap {
  height: 6px;
  background-color: #edf1f7;
  border-radius: 4px;
}
</style>
