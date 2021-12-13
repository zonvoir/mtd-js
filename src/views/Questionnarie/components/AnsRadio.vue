<template>
  <div>
    <div :key="index" v-for="(option, index) in data" class="check_box_wrapper">
      <label class="k_radio_btn check_lable"
        >{{ option.choices }}
        <input
          type="radio"
          :value="option.option_id"
          v-model="answer"
          @change="updateAnswer"
          name="radio"
        />

        <span class="radio_btn"></span>
      </label>
    </div>
    <div v-if="isValid" class="custom_error">Answer is required</div>
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
      answer: undefined,
    };
  },
  created() {
    this.answer = this.currentAns[0];
  },

  methods: {
    updateAnswer() {
      let ansArr = [this.answer];
      console.log(ansArr);
      if (ansArr.length > 0) {
        this.$emit("getUserSelected", ansArr);
      } else {
        this.isValid = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.check_box_wrapper {
  margin-bottom: 28px;
  &:lastchild() {
    margin-bottom: 0 !important;
  }
}
.custom_error {
  color: #db2c66;
  font-size: 14px;
  font-weight: 400;
}
</style>
