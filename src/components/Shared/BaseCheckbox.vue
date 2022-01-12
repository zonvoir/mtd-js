<template>
  <div class="">
    <div class="check_box_wrapper">
      <label class="k_checkbox check_lable">
        <input
          type="checkbox"
          :value="checkval"
          v-model="val"
          @change="updateAnswer"
          checked="checked"
        />
        <span class="checkmark"></span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkval: true,
      val: undefined,
    };
  },

  methods: {
    updateAnswer() {
      console.log("hello checked");
      //   this.$emit("getUserSelected", {
      //     ansData: val,
      //     isFieldValid: this.isFieldValid,
      //   });
    },
  },
};
</script>

<style lang="scss" scoped>
.check_box_wrapper {
  margin-bottom: 20px;
  &:last-child() {
    margin-bottom: 0 !important;
  }
}
.k_checkbox .checkmark {
  position: absolute;
  top: 0px;
  left: 16px;
  height: 20px;
  width: 20px;
  background-color: #ffffff;
  border-radius: 3px;
  outline: 1px solid #e4e9f2;
}
.custom_error {
  color: #db2c66;
  font-size: 14px;
  font-weight: 400;
}
</style>
