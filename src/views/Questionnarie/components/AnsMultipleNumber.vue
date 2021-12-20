<template>
  <div
    v-for="(subQuestion, index) in subQuestions"
    :key="subQuestion.id"
    class="d-flex"
  >
    <div class="sub_question_wrap">
      <h5 class="sub_ques_name">
        {{ subQuestion.sub_question }}
      </h5>
    </div>
    <div class="k_form_group k_inp_number">
      <input
        type="text"
        name="single"
        v-model="ansValue[index]"
        @keypress="isNumber"
        @input="onInput(subQuestion.id, index, $event)"
        class="form-control k_inp_field"
      />
      <!-- @blur="v$.ansValue.$touch"
        :class="{
          'is-invalid': v$.ansValue.$error,
        }" -->
    </div>
  </div>
  <div v-if="isValid" class="custom_error">Answer is required</div>
</template>

<script>
// import { required, numeric } from "@vuelidate/validators";
// import useVuelidate from "@vuelidate/core";

export default {
  props: {
    currentAns: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      numberPattern: /[0-9]/,
      staffAns: new Array(3).fill({
        question_id: "",
        question_ans: "",
      }),
      ansValue: [],
      isValid: false,

      isFieldValid: undefined,
      subQuestions: [
        {
          id: 1,
          sub_question:
            "Please enter the numner of emplyee in your Company     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum amet vel ex eaque atque maiores quas dolor ab assumenda doloribus.",
          staff_answer: [
            {
              qid: 1,
              q_ans: "8",
            },
          ],
        },
        {
          id: 2,
          sub_question:
            "Please enter the numner of inhouse emplyee in your Company",
          staff_answer: [
            {
              qid: 2,
              q_ans: "10",
            },
          ],
        },
        {
          id: 3,
          sub_question:
            "Please enter the numner of contracted emplyee in your Company     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum amet vel ex eaque atque maiores quas dolor ab assumenda doloribus.",
          staff_answer: [
            {
              qid: 3,
              q_ans: "40",
            },
          ],
        },
      ],
    };
  },

  // validations() {
  //   return {
  //     ansValue: { required, numeric },
  //   };
  // },
  // setup() {
  //   return {
  //     v$: useVuelidate(),
  //   };
  // },
  methods: {
    onInput(id, index, event) {
      let tempAns = event.target.value;
      let tempid = id;

      console.log(id, tempAns);

      this.checkValidate(tempAns, tempid, index);
    },
    checkValidate(tempAns, tempid, index) {
      this.staffAns[index] = {
        question_id: tempid,
        question_ans: tempAns,
      };
      this.isValid = true;
      console.log(this.staffAns);
      console.log(this.staffAns.length);
      if (this.staffAns.length === this.subQuestions.length) {
        this.isValid = false;
        console.log("all answered");
      }
    },

    emitData() {},
    isNumber(event) {
      let char = String.fromCharCode(event.keyCode);
      if (this.numberPattern.test(char)) return true;
      else event.preventDefault();
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
