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
        maxlength="6"
        @keydown="isNumber"
        @blur="blurEvent"
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
import numfractionMixin from "../../../mixins/numeric-fraction-numbers";

export default {
  emits: ["getUserSelected"],
  // external mixin code that used for input only number and decimal (.)

  mixins: [numfractionMixin],

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
      staffAns: new Array(this.data.length).fill({
        subquestion_id: "",
        sub_ans: "",
      }),
      isValid: false,
      validPercent: false,
      allAnsFilled: undefined,
    };
  },

  created() {
    // if ans is given set the ans value
    if (this.currentAns != "") {
      this.staffAns = this.currentAns;
      this.allAnsFilled = true;
      this.emitData(this.currentAns);
    }
  },

  methods: {
    // get the value of user given ans
    onInput(id, index, event) {
      let tempAns = event.target.value;
      let tempid = id;
      this.checkValidate(tempAns, tempid, index);
    },

    // this will function check that all ans are filled or not

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

    // send the data to Question Component
    emitData(val) {
      this.$emit("getUserSelected", {
        ansData: val,
        isFieldValid: this.allAnsFilled,
      });
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
  width: 15%;
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
