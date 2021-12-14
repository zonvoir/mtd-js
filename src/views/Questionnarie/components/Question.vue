<template>
  <div>
    <div v-if="questions.length">
      <!-- question Section Start {{ questionIdex }} -->
      <div>
        <h4 class="m-b-0 question_title m-b-14" :data-index="questionIdex">
          {{ questions[currentIdx].name }}
        </h4>
      </div>
      <!-- question Section Start -->
      <!-- Answer Section Start -->
      <div class="option_wrapper">
        <div v-if="questions[currentIdx].type == 'multiple_choice'">
          <AnsCheckbox
            @getUserSelected="userGivenAnswer"
            :data="questions[currentIdx].choices"
            :currentAns="questions[currentIdx].staff_anwser"
          />
        </div>
        <div v-if="questions[currentIdx].type == 'radio_button'">
          <AnsRadio
            @getUserSelected="userGivenAnswer"
            :data="questions[currentIdx].choices"
            :currentAns="questions[currentIdx].staff_anwser"
          />
        </div>
        <div v-if="questions[currentIdx].type == 'yes_no'">
          <AnsSwitch :data="questions[currentIdx].choices" />
        </div>
        <div v-if="questions[currentIdx].type == 'richText'">
          <AnsTextArea :data="questions[currentIdx].choices" />
        </div>
        <div v-if="questions[currentIdx].type == 'text'">
          <!-- @getUserSelected="userGivenAnswer" -->
          <AnsInput
            :key="currentIdx"
            v-model="answerValue"
            @getUserSelected="userGivenAnswer"
            :currentAns="questions[currentIdx].staff_anwser"
          />
        </div>
        <div v-if="questions[currentIdx].type == 'website'">
          <AnsWebsite
            :key="currentIdx"
            v-model="answerValue"
            @getUserSelected="userGivenAnswer"
            :currentAns="questions[currentIdx].staff_anwser"
          />
        </div>
        <div v-if="questions[currentIdx].type == 'dropdown'">
          <AnsSelect
            :key="currentIdx"
            v-model="answerValue"
            @getUserSelected="userGivenAnswer"
            :currentAns="questions[currentIdx].staff_anwser"
            :data="questions[currentIdx].choices"
          />
        </div>
        <div v-if="questions[currentIdx].type == 'manySelect'">
          <AnsMultiSelect
            v-model="answerValue"
            @getUserSelected="userGivenAnswer"
            :currentAns="questions[currentIdx].staff_anwser"
          />
        </div>
        <div v-if="questions[currentIdx].type == 'email'">
          <AnsEmail
            :key="currentIdx"
            v-model="answerValue"
            @getUserSelected="userGivenAnswer"
            :currentAns="questions[currentIdx].staff_anwser"
          />
        </div>
        <div v-if="questions[currentIdx].type == 'phone_number'">
          <AnsPhone
            v-model="answerValue"
            @getUserSelected="userGivenAnswer"
            :currentAns="questions[currentIdx].staff_anwser"
          />
        </div>
        <div v-if="questions[currentIdx].type == 'number'">
          <AnsSingleNumber
            v-model="answerValue"
            @getUserSelected="userGivenAnswer"
            :currentAns="questions[currentIdx].staff_anwser"
          />
        </div>
        <div v-if="questions[currentIdx].type == 'moreNumber'">
          <AnsMultipleNumber
            v-model="answerValue"
            @getUserSelected="userGivenAnswer"
            :currentAns="questions[currentIdx].staff_anwser"
          />
        </div>
        <div v-if="questions[currentIdx].type == 'editor'">
          <AnsTextEditor :data="questions[currentIdx].choices" />
        </div>

        <div v-if="questions[currentIdx].type == 'date'">
          <AnsDate :data="questions[currentIdx].choices" />
        </div>
      </div>
      <!-- Answer Section Ends -->
      <!-- explanation Section Start -->
      <div class="d-flex align-items-center m-b-15">
        <!-- <QuestionExpalnaion /> -->
        <div class="info_icon_wrap m-r-10">
          <img src="K_Icons/info_gray_24dp.svg" alt="" class="svg_icon" />
        </div>
        <h6 class="question_expaltion">
          Question explanation
          <a class="custom-link" @click="updateIsHint()">see here</a>
        </h6>
        <br />
      </div>
      <QuestionHint
        v-if="isHint"
        :hint="questions[currentIdx].hint"
        :hint-type="questions[currentIdx].hint_type"
      />
      <!-- explanation Section Ends -->
      <!-- bottom section start -->
      <div class="btns_wrap">
        <button
          type="button"
          :disabled="currentIdx == 0"
          @click="prevoiusQuestion"
          class="btn text-uppercase btn-primary btn-set m-r-20"
        >
          previous
        </button>
        <button
          type="button"
          :disabled="!isValidated"
          :class="currentIdx >= questions.length - 1 ? 'd-none' : ''"
          @click="nextQuestion(questions[currentIdx].id)"
          class="btn text-uppercase btn-primary btn-set"
        >
          next
        </button>

        <button
          type="button"
          :disabled="!isValidated"
          :class="currentIdx >= questions.length - 1 ? '' : 'd-none'"
          @click="finishQuestion(questions[currentIdx].id)"
          class="btn text-uppercase btn-primary btn-set"
        >
          Finish
        </button>
      </div>
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
import QuestionHint from "./QuestionHint.vue";

export default {
  props: {},
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
    QuestionHint,
    AnsSelect,
  },
  data() {
    return {
      currentIdx: 0,
      quiz: [],
      isHint: false,
      isValidated: undefined,
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      authToken: "",
      answerValue: "" | [],
    };
  },

  computed: {
    ...mapState({
      questions: (state) => state.questionList,
    }),
    questionIdex() {
      console.log(this.$store.getters.randomQuizIndex);
      return this.$store.getters.randomQuizIndex;
    },
  },

  watch: {
    questionIdex: function () {
      if (this.questionIdex == 0) {
        this.currentIdx = this.questionIdex;
      } else {
        this.currentIdx = this.questionIdex || this.currentIdx;
      }
      this.answerValue = this.questions[this.currentIdx].staff_anwser;
    },
    questions: function () {
      this.calculateAnserdQuestion();
    },
  },

  created() {
    this.quiz = this.questions[this.currentIdx];
    this.authToken = this.staffData.auth_token;
  },
  mounted() {
    this.currentIdx = this.questionIdex || 0;
    this.calculateAnserdQuestion();
  },
  methods: {
    userGivenAnswer(value) {
      console.log("value date", value);
      this.answerValue = value.ansData;
      this.isValidated = value.isFieldValid;
    },
    updateIsHint() {
      this.isHint = !this.isHint;
    },
    nextQuestion(id) {
      this.isHint = false;
      console.log(id);
      let data = {
        auth_token: this.authToken,
        question_id: id,
        answer:
          this.answerValue || this.questions[this.currentIdx].staff_anwser,
      };
      this.submitAnswer(data);
      return this.currentIdx;
    },
    finishQuestion(id) {
      console.log(id);
      let data = {
        auth_token: this.authToken,
        question_id: id,
        answer: this.answerValue,
      };

      this.submitAnswer(data);
    },
    prevoiusQuestion() {
      this.isHint = false;
      this.currentIdx = this.currentIdx - 1;
      this.quiz = this.questions[this.currentIdx];
      // this.$store.dispatch("getIncrementProgressValue", 10);
      return this.currentIdx;
    },
    submitAnswer(data) {
      console.log("userdata", data);
      QuestionnaireService.submitAnswer(data).then((res) => {
        this.questions[this.currentIdx].is_answered = true;
        if (res.data.status) {
          if (this.currentIdx >= this.questions.length - 1) {
            this.$toast.success("Questionniare completed.", {
              position: "bottom-left",
              duration: 3712,
            });
            let ro = this.$route.params;
            this.$router.push({
              name: "category-results",
              params: { did: ro.departmentid, id: ro.categoryId },
            });
          } else {
            this.questions[this.currentIdx].is_answered = true;
            this.questions[this.currentIdx].staff_anwser = data.answer;
            console.log("vis csum", this.questions);

            this.currentIdx = this.currentIdx + 1;
            this.quiz = this.questions[this.currentIdx];
          }
          this.calculateAnserdQuestion();
        } else {
          let $th = this;
          if ("error" in res.data) {
            Object.keys(res.data.error).map((key) => {
              $th.$toast.error(res.data.error[key], {
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
    calculateAnserdQuestion() {
      let answeredArr = [];
      let totalQuestions = this.questions.length;
      this.questions.forEach((e) => {
        if (e.is_answered) {
          answeredArr.push(e);
        }
      });
      let answeredQuestions = answeredArr.length;
      let perValue = (answeredQuestions / totalQuestions) * 100;
      if (isNaN(perValue)) {
        perValue = 0;
      }
      perValue = parseInt(perValue);
      this.$store.dispatch("getIncrementProgressValue", perValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.btns_wrap {
  position: fixed;
  bottom: 16px;
  right: 20px;
}
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
  margin-bottom: 0;
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
