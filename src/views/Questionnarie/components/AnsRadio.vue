<template>
  <!-- <div class="check_box_wrapper" :key="index" v-for="(option, index) in data">
      <label class="k_checkbox check_lable">
        {{ option.choice }}
        <input type="checkbox" v-model="option.value" checked="checked" />
        <span class="checkmark"></span>
      </label>
    </div> -->
  <div
    :key="index"
    v-for="(option, index) in data"
    class="check_box_wrapper m-b-28"
  >
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
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      answer: undefined,
    };
  },
  methods: {
    updateAnswer() {
      let ansArr = [this.answer];
      // this.answer.forEach((val, ind) => {
      //   if (val) {
      //     ansArr.push(this.data[ind].option_id);
      //   }
      //   console.log(val, ind, ansArr);
      // });
      this.$emit("getUserSelected", ansArr);
      // console.log(ansArr);
    },
  },
};
</script>

<style lang="scss" scoped></style>
