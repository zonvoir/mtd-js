<template>
  <div class="">
    <div class="check_box_wrapper" :key="index" v-for="(option, index) in data">
      <label class="k_checkbox check_lable">
        {{ option.choices }}
        <input
          type="checkbox"
          :value="option.option_id"
          v-model="answer[index]"
          @change="updateAnswer"
          checked="checked"
        />
        <span class="checkmark"></span>
      </label>
    </div>
    <div v-if="isValid" class="custom_error">Answer is required</div>
    <!-- <div class="invalid-feedback text-left">Answer is required</div> -->
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    currentAns: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      isValid: false,
      isFieldValid: undefined,
      answer: new Array(this.data.length).fill(false),
    };
  },
  created() {
    this.data.forEach((opt, index) => {
      if (this.currentAns.includes(opt.option_id)) {
        this.answer[index] = true;
      }
    });
  },
  methods: {
    updateAnswer() {
      let ansArr = [];
      this.answer.forEach((val, ind) => {
        if (val) {
          ansArr.push(this.data[ind].option_id);
        }
      });
      this.isValid = this.answer.every((e) => e === false);
      this.isFieldValid = true;
      if (this.isValid) {
        this.isFieldValid = !this.isValid;
      }
      this.$emit("getUserSelected", {
        ansData: ansArr,
        isFieldValid: this.isFieldValid,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.check_box_wrapper {
  margin-bottom: 28px;
  &:last-child() {
    margin-bottom: 0 !important;
  }
}
.custom_error {
  color: #db2c66;
  font-size: 14px;
  font-weight: 400;
}
</style>
