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
  emits: ["getUserSelected"],

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
      isFieldValid: true,
    };
  },
  created() {
    // if ans is given set the ans value
    let stfAns = this.currentAns[0];
    if (stfAns != "") {
      this.isFieldValid = true;
      this.answer = stfAns;
      this.emitData([this.answer]);
    }
  },

  methods: {
    // get the value of user given ans

    updateAnswer() {
      let ansArr = [this.answer];
      if (ansArr.length > 0) {
        this.isValid = false;
        this.isFieldValid = true;
      } else {
        this.isValid = true;
        this.isFieldValid = false;
      }
      this.emitData(ansArr);
    },

    // send the data to Question Component
    emitData(val) {
      this.$emit("getUserSelected", {
        ansData: val,
        isFieldValid: this.isFieldValid,
      });
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
