<template>
  <div>
    <!-- {{ questions }} -->
    <!-- question Section Start -->
    <div>
      <!-- <QuestionTitle :questionTitle="question.questrionTitle" /> -->
      <h4 class="m-b-0 question_title m-b-14">
        {{ quiz.name }}
        <!-- The earliest moment that the critical event and measurability are both
        satisfied for revenue recognition is usually? -->
      </h4>
    </div>
    <!-- question Section Start -->

    <!-- Answer Section Start -->
    <!-- {{ quiz.answers }} -->
    <div class="option_wrapper">
      <div v-if="quiz.type == 'multiple_choice'">
        <AnsCheckbox :data="quiz.choices" />
      </div>
      <div v-if="quiz.type == 'radio_button'">
        <AnsRadio :data="quiz.answers" />
      </div>
      <div v-if="quiz.type == 'yesNo'">
        <AnsSwitch :data="quiz.answers" />
      </div>
      <div v-if="quiz.type == 'richText'">
        <AnsTextArea :data="quiz.answers" />
      </div>
      <div v-if="quiz.type == 'text'">
        <AnsInput :data="quiz.answers" />
      </div>
      <div v-if="quiz.type == 'website'">
        <AnsWebsite :data="quiz.answers" />
      </div>
      <div v-if="quiz.type == 'select'">
        <AnsSelect :data="quiz.answers" />
      </div>
      <div v-if="quiz.type == 'manySelect'">
        <AnsMultiSelect :data="quiz.answers" />
      </div>
      <div v-if="quiz.type == 'email'">
        <AnsEmail :data="quiz.answers" />
      </div>
      <div v-if="quiz.type == 'phone'">
        <AnsPhone :data="quiz.answers" />
      </div>
      <div v-if="quiz.type == 'onlyNumber'">
        <AnsSingleNumber :data="quiz.answers" />
      </div>
      <div v-if="quiz.type == 'moreNumber'">
        <AnsMultipleNumber :data="quiz.answers" />
      </div>
      <div v-if="quiz.type == 'editor'">
        <AnsTextEditor :data="quiz.answers" />
      </div>

      <div v-if="quiz.type == 'date'">
        <AnsDate :data="quiz.answers" />
      </div>
    </div>
    <!-- Answer Section Ends -->
    <!-- explanation Section Start -->
    <div class="d-flex align-items-center exp_wrap m-b-28">
      <!-- <QuestionExpalnaion /> -->
      <div class="info_icon_wrap m-r-10">
        <img src="K_Icons/info_gray_24dp.svg" alt="" class="svg_icon" />
      </div>
      <h6 class="question_expaltion">
        Question explanation <a class="custom-link">see here</a>
      </h6>
    </div>
    <!-- explanation Section Ends -->
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
        @click="nextQuestion(quiz.id)"
        class="btn text-uppercase btn-primary btn-set"
      >
        next
      </button>
    </div>
    <!-- bottom section ends -->
  </div>
</template>

<script>
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
import QuestionnaireService from "../../../Services/QuestionnaireServices/Questionnaire";
import { mapState } from "vuex";

export default {
  props: {
    // questions: {
    //   type: Array,
    //   required: true,
    // },
  },
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
      quiz: [],
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      authToken: "",
    };
  },
  computed: mapState({
    questions: (state) => state.questionList,
  }),
  mounted() {
    this.quiz = this.questions[this.currentIdx];
    this.authToken = this.staffData.auth_token;
  },
  methods: {
    nextQuestion(id) {
      console.log(id);

      let data = {
        auth_token: this.authToken,
        question_id: id,
        answer: "Kuldip ",
      };
      this.submitAnswer(data);

      return this.currentIdx;
    },
    prevoiusQuestion() {
      this.currentIdx = this.currentIdx - 1;
      this.quiz = this.questions[this.currentIdx];
      return this.currentIdx;
    },
    submitAnswer(data) {
      // console.log(data);
      QuestionnaireService.submitAnswer(data).then((res) => {
        this.questions[this.currentIdx].is_answered = true;
        this.$store.dispatch("getQuestionList", this.questions);
        if (res.data.status) {
          console.log(this.questions[this.currentIdx]);
          this.currentIdx = this.currentIdx + 1;
          this.quiz = this.questions[this.currentIdx];
          console.log("responce after submit answer", res);
        } else {
          let $th = this;
          if ("error" in res.data) {
            Object.keys(res.data.error).map((key) => {
              $th.toast.error(res.data.error[key], {
                position: "bottom-left",
                duration: 3712,
              });
            });
          } else {
            $th.$toast.error(res.data.message, {
              position: "bottom-left",
              duration: 3712,
            });
          }
        }
      });
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
.exp_wrap {
  margin-bottom: 210px;
}
.option_wrapper {
  padding: 0 0 0 36px;
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
