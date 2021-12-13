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
      answer: new Array(this.data.length).fill(false),
    };
  },
  created() {
    // console.log(this.currentAns);
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
        // console.log(val, ind, ansArr);
      });
      this.isValid = this.answer.every((e) => e === false);
      console.log(this.isValid);
      if (this.isValid) {
        this.$emit("getUserSelected", ansArr);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.check_box_wrapper {
  margin-bottom: 28px;
  &:nth-last-child() {
    margin-bottom: 0 !important;
  }
}
.custom_error {
  color: #db2c66;
  font-size: 14px;
  font-weight: 400;
}
</style>
