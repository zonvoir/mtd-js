<template>
  <div
    v-for="(subQuestion, index) in data"
    :key="subQuestion.subquestion_id"
    class="d-flex"
  >
    <div class="sub_question_wrap">
      <h5 class="sub_ques_name">
        {{ subQuestion.subquestion }}
      </h5>
    </div>
    <div class="k_form_group percent_ans k_inp_number">
      <input
        :key="'mni' + index"
        type="text"
        name="single"
        :value="staffAns[index].sub_ans"
        minlength="1"
        maxlength="3"
        @keypress="isNumber"
        @input="onInput(subQuestion.subquestion_id, index, $event)"
        class="form-control k_inp_field"
      />
      <span class="percent_symbol">%</span>
    </div>
  </div>
  <div v-if="isValid" class="custom_error">All answer is required</div>
  <div v-if="validPercent" class="custom_error">
    Sum of all answer must be 100 %
  </div>
</template>

<script>
export default {
  emits: ["getUserSelected"],
  props: {
    data: {
      required: true,
      type: Array,
    },
    currentAns: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      numberPattern: /[0-9]/,
      staffAns: new Array(this.data.length).fill({
        subquestion_id: "",
        sub_ans: "",
      }),
      // staffAns: [],
      isValid: false,
      validPercent: false,
      allAnsFilled: undefined,
    };
  },
  created() {
    console.log(this.staffAns);
    if (this.currentAns != "") {
      this.staffAns = this.currentAns;
      this.allAnsFilled = true;
      this.emitData(this.currentAns);
      console.log("current ans", this.staffAns);
    }
  },
  methods: {
    onInput(id, index, event) {
      let tempAns = event.target.value;
      let tempid = id;
      this.checkValidate(tempAns, tempid, index);
    },
    checkValidate(tempAns, tempid, index) {
      this.staffAns[index] = {
        subquestion_id: tempid,
        sub_ans: tempAns,
      };
      let totalPercent = this.staffAns.reduce((total, currentValue) => {
        return total + Number(currentValue.sub_ans);
      }, 0);
      console.log("staffAns", totalPercent, this.validPercent);
      this.isValid = this.staffAns.some((e) => e.sub_ans === "");
      this.allAnsFilled = true;
      if (this.isValid) {
        this.allAnsFilled = !this.isValid;
      } else if (totalPercent === 100) {
        this.validPercent = false;
        this.allAnsFilled = true;
      } else {
        this.allAnsFilled = false;
        this.validPercent = true;
      }
      this.emitData(this.staffAns);
    },

    emitData(val) {
      this.$emit("getUserSelected", {
        ansData: val,
        isFieldValid: this.allAnsFilled,
      });
    },
    isNumber(event) {
      let char = String.fromCharCode(event.keyCode);
      if (this.numberPattern.test(char)) return true;
      else event.preventDefault();
    },
  },
};
</script>

<style lang="scss" scoped>
.percent_ans {
  display: inline-flex;
  align-items: center;
}
.percent_symbol {
  margin-left: 16px;
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
  color: #222b45;
}
.custom_error {
  color: #db2c66;
  font-size: 14px;
  font-weight: 400;
}
.sub_question_wrap {
  width: 80%;
}
.k_inp_number {
  width: 10%;
  margin-left: 2rem;
  text-align: center;
}
.sub_ques_name {
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  color: #222b45;
}
</style>
