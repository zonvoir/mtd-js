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
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      answer: new Array(this.data.length).fill(false),
    };
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
      this.$emit("getUserSelected", ansArr);
      // console.log(ansArr);
    },
  },
};
</script>

<style lang="scss" scoped>
.check_box_wrapper {
  margin-bottom: 28px;
  &:lastchild() {
    margin-bottom: 0;
  }
}
</style>
