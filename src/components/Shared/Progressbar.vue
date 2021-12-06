<template>
  <div class="progess_wrappwer">
    <p class="m-b-0 progres_value">
      <span>{{ valuenow }}%</span> to complete
    </p>
    <button class="btn btn-transaprent zp-0 m-l-auto">
      <img src="K_Icons/cancel.svg" alt="" class="cancel_icon" />
    </button>
  </div>
  <div class="progress k_progress_wrap">
    <div
      class="progress-bar k_progress_bar"
      role="progressbar"
      :style="{ width: valuenow + '%' }"
      :aria-valuenow="valuenow"
      :aria-valuemin="valuemin"
      :aria-valuemax="valuemax"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    valuenow: {
      required: true,
    },
    valuemin: {
      required: true,
    },
    valuemax: {
      required: true,
    },
  },
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
