<template>
  <div>
    <div class="notification_wrpa" :class="{ isToastActive: 'toastVisible' }">
      <p class="resp_message">{{ noticeMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isActive", "noticeMessage"],
  data() {
    return {
      isToastActive: this.isActive,
    };
  },
  created() {
    // setTimeout(()=>{
    //   this.isActive =false
    // },4000)
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.notification_wrpa {
  position: fixed;
  left: -100%;
  bottom: 5px;
  padding: 20px;
  width: 210px;
  border-radius: 0;
  transition: 0.8s;
  z-index: 9999;
  &.toastVisible {
    left: 0;
  }
  &.success_toast {
    background-color: #18a33b;
    // left: 0 !important;
  }
  &.error_toast {
    background-color: #f14747;
    // left: 0 !important;
  }
  .resp_message {
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    margin-bottom: 0;
  }
}
</style>
