<template>
  <div class="">
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
      <div class="k_form_group k_inp_number m-r-10">
        <input
          :key="subQuestion.subquestion_id"
          type="text"
          name="single"
          @keydown="isNumber"
          @blur="blurEvent"
          @input="onInput(subQuestion.subquestion_id, index, $event)"
          :value="staffAns[index].sub_ans"
          class="form-control k_inp_field"
        />
      </div>
    </div>
    <div v-if="isValid" class="custom_error">All answer is required</div>
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

      updatetedAns: "",
      isValid: false,
      allAnsFilled: undefined,
    };
  },

  created() {
    // if ans is given set the ans value
    if (this.currentAns != "") {
      this.staffAns = this.currentAns;
      this.allAnsFilled = true;
      this.emitData(this.currentAns);
      console.log("current ans", this.staffAns);
    }
  },

  methods: {
    // get the value of user given ans

    onInput(qid, index, event) {
      console.log(qid, index, event);
      let dataI = "";
      if (event.target.value.includes(".")) {
        console.log("decimal is available", event.target.value);
        let dataValArr = event.target.value.split(".");
        let str_first = dataValArr[0];
        let str_last = dataValArr[1];
        // format input like 123 123.123
        let itermediatData =
          str_first //below code modify in middle
            .replace(/ /g, "")
            .match(/.{1,3}/g)
            .join(" ") +
          "." +
          (str_last.length > 3 ? "" : str_last);
        dataI = itermediatData;
      } else {
        // format input like 123 123 123
        console.log("no decimal", event.target.value);

        if (event.target.value !== "") {
          dataI = event.target.value
            .replace(/ /g, "")
            .match(/.{1,3}/g)
            .join(" ");
        }
      }
      this.checkValidate(dataI, qid, index);
    },

    // this will function check that all ans are filled or not
    checkValidate(tempAns, tempid, index) {
      this.staffAns[index] = {
        subquestion_id: tempid,
        sub_ans: tempAns,
      };
      console.log(this.staffAns[index]);
      this.isValid = this.staffAns.some((e) => e.sub_ans === "");
      this.allAnsFilled = true;
      if (this.isValid) {
        this.allAnsFilled = !this.isValid;
      }
      console.log(this.isValid);

      console.log(this.staffAns.length);
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
.custom_error {
  color: #db2c66;
  font-size: 14px;
  font-weight: 400;
}
.sub_question_wrap {
  width: 80%;
}
.k_inp_number {
  width: 18%;
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
