<template>
  <div class="">
    <!-- question Section Start -->
    <div class="">
      <!-- <QuestionTitle :questionTitle="question.questrionTitle" /> -->
      <h4 class="m-b-0 question_title m-b-14">
        {{ quiz.questrionTitle }}
        <!-- The earliest moment that the critical event and measurability are both
        satisfied for revenue recognition is usually? -->
      </h4>
    </div>
    <!-- question Section Start -->
    <!-- explanation Section Start -->
    <div class="d-flex align-items-center m-b-28">
      <!-- <QuestionExpalnaion /> -->
      <div class="info_icon_wrap m-r-10">
        <img src="K_Icons/info_gray_24dp.svg" alt="" class="svg_icon" />
      </div>
      <h6 class="question_expaltion">
        Question explanation <a class="custom-link">see here</a>
      </h6>
    </div>
    <!-- explanation Section Ends -->
    <!-- Answer Section Start -->

    <div class="option_wrapper">
      <div v-if="quiz.ansType == 'checkbox'" class="">
        <AnsCheckbox :data="quiz.options" />
      </div>
      <div v-if="quiz.ansType == 'radio'" class="">
        <AnsRadio :data="quiz.options" />
      </div>
      <div v-if="quiz.ansType == 'yesNo'" class="">
        <AnsSwitch :data="quiz.options" />
      </div>
      <div v-if="quiz.ansType == 'richText'" class="">
        <AnsTextArea :data="quiz.options" />
      </div>
      <div v-if="quiz.ansType == 'freeText'" class="">
        <AnsInput :data="quiz.options" />
      </div>
      <div v-if="quiz.ansType == 'website'" class="">
        <AnsWebsite :data="quiz.options" />
      </div>
      <div v-if="quiz.ansType == 'select'" class="">
        <AnsSelect :data="quiz.options" />
      </div>
      <div v-if="quiz.ansType == 'manySelect'" class="">
        <AnsMultiSelect :data="quiz.options" />
      </div>
      <div v-if="quiz.ansType == 'email'" class="">
        <AnsEmail :data="quiz.options" />
      </div>
      <div v-if="quiz.ansType == 'phone'" class="">
        <AnsPhone :data="quiz.options" />
      </div>
      <div v-if="quiz.ansType == 'onlyNumber'" class="">
        <AnsSingleNumber :data="quiz.options" />
      </div>
      <div v-if="quiz.ansType == 'moreNumber'" class="">
        <AnsMultipleNumber :data="quiz.options" />
      </div>
      <div v-if="quiz.ansType == 'editor'" class="">
        <AnsTextEditor :data="quiz.options" />
      </div>

      <div v-if="quiz.ansType == 'date'" class="">
        <AnsDate :data="quiz.options" />
      </div>
    </div>
    <!-- Answer Section Ends -->
    <!-- bottom section start -->
    <div class="btns_wrap">
      <button
        type="button"
        @click="prevoiusQuestion"
        class="btn dis_btn text-uppercase btn-transaprent btn-set m-r-20"
      >
        previous
      </button>
      <button
        type="button"
        @click="nextQuestion"
        class="btn text-uppercase btn-primary btn-set"
      >
        next
      </button>
    </div>
    <!-- bottom section ends -->
  </div>
</template>

<script>
const questionnaire = [
  {
    id: "1",
    questrionTitle:
      "The earliest moment that the criticle event and measurability",
    ansType: "checkbox",
    options: [
      { id: 1, value: true, choice: "Before the sale" },
      { id: 2, value: false, choice: "After the sale" },
      { id: 3, value: false, choice: "At the Time of the sale" },
    ],
    isAnswerd: true,
  },
  {
    id: "2",
    questrionTitle:
      "The earliest moment that the criticle event and measurability",
    ansType: "radio",
    options: [
      { id: 1, value: "beforeSale", choice: "Before the sale" },
      { id: 2, value: "afterSale", choice: "After the sale" },
      { id: 3, value: "attimeofSale", choice: "At the Time of the sale" },
    ],
    isAnswerd: true,
  },
  {
    id: "3",
    questrionTitle:
      "The earliest moment that the criticle event and measurability",
    ansType: "select",
    options: [
      { choice: "Before the sale" },
      { choice: "After the sale" },
      { choice: "At the Time of the sale" },
    ],
    isAnswerd: true,
  },
  {
    id: "4",
    questrionTitle:
      "The earliest moment that the criticle event and measurability",
    ansType: "email",
    options: [
      { choice: "Before the sale" },
      { choice: "After the sale" },
      { choice: "At the Time of the sale" },
    ],
    isAnswerd: true,
  },
  {
    id: "5",
    questrionTitle:
      "The earliest moment that the criticle event and measurability",
    ansType: "phone",
    options: [
      { choice: "Before the sale" },
      { choice: "After the sale" },
      { choice: "At the Time of the sale" },
    ],
    isAnswerd: true,
  },
  {
    id: "6",
    questrionTitle:
      "The earliest moment that the criticle event and measurability",
    ansType: "website",
    options: [
      { choice: "Before the sale" },
      { choice: "After the sale" },
      { choice: "At the Time of the sale" },
    ],
    isAnswerd: false,
  },
  {
    id: "7",
    questrionTitle:
      "The earliest moment that the criticle event and measurability",
    ansType: "onlyNumber",
    options: [
      { choice: "Before the sale" },
      { choice: "After the sale" },
      { choice: "At the Time of the sale" },
    ],
    isAnswerd: false,
  },
  {
    id: "8",
    questrionTitle:
      "The earliest moment that the criticle event and measurability",
    ansType: "moreNumber",
    options: [
      { choice: "Before the sale" },
      { choice: "After the sale" },
      { choice: "At the Time of the sale" },
    ],
    isAnswerd: false,
  },
  {
    id: "9",
    questrionTitle:
      "The earliest moment that the criticle event and measurability",
    ansType: "manySelect",
    options: [
      { choice: "Before the sale" },
      { choice: "After the sale" },
      { choice: "At the Time of the sale" },
    ],
    isAnswerd: false,
  },
  {
    id: "10",
    questrionTitle:
      "The earliest moment that the criticle event and measurability",
    ansType: "date",
    options: [
      { choice: "Before the sale" },
      { choice: "After the sale" },
      { choice: "At the Time of the sale" },
    ],
    isAnswerd: false,
  },
  {
    id: "11",
    questrionTitle:
      "The earliest moment that the criticle event and measurability",
    ansType: "yesNo",
    options: [
      { choice: "Before the sale" },
      { choice: "After the sale" },
      { choice: "At the Time of the sale" },
    ],
    isAnswerd: false,
  },
  {
    id: "12",
    questrionTitle:
      "The earliest moment that the criticle event and measurability",
    ansType: "editor",
    options: [
      { choice: "Before the sale" },
      { choice: "After the sale" },
      { choice: "At the Time of the sale" },
    ],
    isAnswerd: false,
  },
  {
    id: "13",
    questrionTitle:
      "The earliest moment that the criticle event and measurability",
    ansType: "freeText",
    options: [
      { choice: "Before the sale" },
      { choice: "After the sale" },
      { choice: "At the Time of the sale" },
    ],
    isAnswerd: false,
  },
  {
    id: "14",
    questrionTitle:
      "The earliest moment that the criticle event and measurability",
    ansType: "richText",
    options: [
      { choice: "Before the sale" },
      { choice: "After the sale" },
      { choice: "At the Time of the sale" },
    ],
    isAnswerd: false,
  },
];
import AnsCheckbox from "./AnsCheckbox.vue";
import AnsRadio from "./AnsRadio.vue";
import AnsSwitch from "./AnsSwitch.vue";
import AnsTextArea from "./AnsTextArea.vue";
import AnsInput from "./AnsInput.vue";
import AnsMultipleNumber from "./AnsMultipleNumber.vue";
import AnsSingleNumber from "./AnsSingleNumber.vue";
import AnsPhone from "./AnsPhone.vue";
import AnsEmail from "./AnsEmail.vue";
import AnsMultiSelect from "./AnsMultiSelect.vue";
import AnsWebsite from "./AnsWebsite.vue";
import AnsSelect from "./AnsSelect.vue";
import AnsTextEditor from "./AnsTextEditor.vue";
import AnsDate from "./AnsDate.vue";
export default {
  components: {
    AnsTextEditor,
    AnsCheckbox,
    AnsRadio,
    AnsDate,
    AnsTextArea,
    AnsSwitch,
    AnsInput,
    AnsMultipleNumber,
    AnsSingleNumber,
    AnsPhone,
    AnsEmail,
    AnsMultiSelect,
    AnsWebsite,
    AnsSelect,
  },
  data() {
    return {
      currentIdx: 0,
      quiz: questionnaire[0],
    };
  },
  methods: {
    nextQuestion() {
      this.currentIdx = this.currentIdx + 1;
      (this.quiz = questionnaire[this.currentIdx]),
        console.log("nextQ" + this.quiz);
      return this.currentIdx;
    },
    prevoiusQuestion() {
      this.currentIdx = this.currentIdx - 1;
      this.quiz = questionnaire[this.currentIdx];
      return this.currentIdx;
    },
  },
};
</script>

<style lang="scss" scoped>
.dis_btn {
  color: #7900d8;
  &:hover {
    color: #7900d8;
  }
}
.option_wrapper {
  padding: 0 0 0 36px;
  height: 320px;
}
.question_title {
  font-size: 22px;
  font-weight: 700;
  line-height: 25px;
  color: #000000;
}
.question_expaltion {
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
  font-style: italic;
  color: #000000;
}
.info_icon_wrap {
  width: 24px;
  height: 24px;
  position: relative;
}
</style>
