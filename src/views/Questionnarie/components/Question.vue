<template>
  <div @keyup="enterClicked">
    <div v-if="questions.length" class="">
      <!-- question Section Start  -->

      <div>
        <h4 class="m-b-0 question_title m-b-14" :data-index="questionIdex">
          {{ questions[currentIdx].name }}
        </h4>
      </div>
      <div class="sec_scrollbar">
        <div
          v-if="questions[currentIdx].description"
          class="ques_descption_wrap"
        >
          <p
            class="ques_descption"
            v-html="questions[currentIdx].description"
          ></p>
        </div>
        <!-- question Section Start -->
        <!-- Answer Section Start -->
        <div class="option_wrapper">
          <div v-if="questions[currentIdx].type == 'multiple_choice'">
            <AnsCheckbox
              ref="ans_checkbox"
              :key="currentIdx"
              @getUserSelected="userGivenAnswer"
              :data="questions[currentIdx].choices"
              :currentAns="questions[currentIdx].staff_anwser"
            />
          </div>
          <div v-if="questions[currentIdx].type == 'radio_button'">
            <AnsRadio
              ref="ans_radio"
              :key="currentIdx"
              @getUserSelected="userGivenAnswer"
              :data="questions[currentIdx].choices"
              :currentAns="questions[currentIdx].staff_anwser"
            />
          </div>
          <div v-if="questions[currentIdx].type == 'yes_no'">
            <AnsSwitch
              ref="ans_switch"
              :key="currentIdx"
              v-model="answerValue"
              @getUserSelected="userGivenAnswer"
              :currentAns="questions[currentIdx].staff_anwser"
            />
          </div>

          <div v-if="questions[currentIdx].type == 'text'">
            <AnsInput
              ref="ans_freeText"
              :key="currentIdx"
              v-model="answerValue"
              @getUserSelected="userGivenAnswer"
              :currentAns="questions[currentIdx].staff_anwser"
            />
          </div>
          <div v-if="questions[currentIdx].type == 'website'">
            <AnsWebsite
              ref="ans_url"
              :key="currentIdx"
              v-model="answerValue"
              @getUserSelected="userGivenAnswer"
              :currentAns="questions[currentIdx].staff_anwser"
            />
          </div>
          <div v-if="questions[currentIdx].type == 'dropdown'">
            <AnsSelect
              ref="ans_dropdown"
              :key="currentIdx"
              v-model="answerValue"
              @getUserSelected="userGivenAnswer"
              :currentAns="questions[currentIdx].staff_anwser"
              :data="questions[currentIdx].choices"
            />
          </div>

          <div v-if="questions[currentIdx].type == 'email'">
            <AnsEmail
              ref="ans_email"
              :key="currentIdx"
              v-model="answerValue"
              @getUserSelected="userGivenAnswer"
              :currentAns="questions[currentIdx].staff_anwser"
            />
          </div>
          <div v-if="questions[currentIdx].type == 'phone_number'">
            <AnsPhone
              ref="ans_phone_no"
              :key="currentIdx"
              v-model="answerValue"
              @getUserSelected="userGivenAnswer"
              :currentAns="questions[currentIdx].staff_anwser"
            />
          </div>
          <div v-if="questions[currentIdx].type == 'number'">
            <AnsSingleNumber
              ref="ans_single_number"
              :key="currentIdx"
              v-model="answerValue"
              @getUserSelected="userGivenAnswer"
              :currentAns="questions[currentIdx].staff_anwser"
            />
          </div>
          <!--  -->
          <div v-if="questions[currentIdx].type == 'multi_number'">
            <AnsMultipleNumber
              :key="currentIdx"
              v-model="answerValue"
              :data="questions[currentIdx].subquestions"
              @getUserSelected="userGivenAnswer"
              :currentAns="questions[currentIdx].staff_anwser"
            />
          </div>
          <!--  -->
          <div v-if="questions[currentIdx].type == 'percent'">
            <AnsPercent
              :key="currentIdx"
              v-model="answerValue"
              :data="questions[currentIdx].subquestions"
              @getUserSelected="userGivenAnswer"
              :currentAns="questions[currentIdx].staff_anwser"
            />
          </div>

          <div v-if="questions[currentIdx].type == 'date'">
            <AnsDate
              ref="ans_date"
              :key="currentIdx"
              v-model="answerValue"
              @getUserSelected="userGivenAnswer"
              :currentAns="questions[currentIdx].staff_anwser"
            />
          </div>
        </div>
        <!-- Answer Section Ends -->
        <!-- explanation Section Start -->

        <div v-if="questions[currentIdx].hint" class="">
          <div class="d-flex align-items-center m-b-15">
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
            :size_height="+questions[currentIdx].hint_height"
            :size_width="+questions[currentIdx].hint_width"
          />
        </div>
      </div>
      <!-- explanation Section Ends -->
      <!-- bottom section start -->
    </div>
    <div class="btns_wrap">
      <div v-if="questions.length > 1" class="">
        <button
          :key="currentIdx"
          type="button"
          :disabled="currentIdx == 0"
          @click="prevoiusQuestion"
          class="btn text-uppercase btn-primary btn-set m-r-20"
        >
          previous
        </button>
        <button
          :key="currentIdx"
          type="button"
          :disabled="!isValidated"
          :class="currentIdx >= questions.length - 1 ? 'd-none' : ''"
          @click="nextQuestion(questions[currentIdx].id)"
          class="btn text-uppercase btn-primary btn-set"
        >
          next
        </button>
      </div>
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
    <!-- bottom section ends -->
  </div>
</template>

<script>
import AnsCheckbox from "./AnsCheckbox.vue";
import AnsRadio from "./AnsRadio.vue";
import AnsSwitch from "./AnsSwitch.vue";
import AnsInput from "./AnsInput.vue";
import AnsMultipleNumber from "./AnsMultipleNumber.vue";
import AnsSingleNumber from "./AnsSingleNumber.vue";
import AnsPhone from "./AnsPhone.vue";
import AnsEmail from "./AnsEmail.vue";
import AnsWebsite from "./AnsWebsite.vue";
import AnsSelect from "./AnsSelect.vue";
import AnsPercent from "./AnsPercent.vue";
import AnsDate from "./AnsDate.vue";
import QuestionnaireService from "../../../Services/QuestionnaireServices/Questionnaire";
import { mapGetters } from "vuex";
import QuestionHint from "./QuestionHint.vue";
import errorhandler from "../../../utils/Error";
export default {
  props: {},

  components: {
    AnsCheckbox,
    AnsRadio,
    AnsDate,
    AnsSwitch,
    AnsInput,
    AnsMultipleNumber,
    AnsSingleNumber,
    AnsPhone,
    AnsEmail,
    AnsWebsite,
    QuestionHint,
    AnsPercent,
    AnsSelect,
  },

  data() {
    return {
      currentIdx: 0,
      testCard: "",
      quiz: [],
      isHint: false,
      isValidated: false,
      // staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      authToken: "",
      answerValue: "" | [],
    };
  },

  computed: {
    // vuex getter variables
    ...mapGetters({
      questions: "getQuestionList",
      staffData: "staffDataLocal",
    }),

    // random clicked questio on questionnaire sidebar
    questionIdex() {
      return this.$store.getters.randomQuizIndex;
    },
  },

  watch: {
    // watch the question index value, to check is comming from random selected Question or normal next question
    questionIdex: function () {
      if (this.questionIdex == 0) {
        this.currentIdx = this.questionIdex;
      } else {
        this.currentIdx = this.questionIdex || this.currentIdx;
      }
      this.isHint = false;
      this.answerValue = this.questions[this.currentIdx].staff_anwser;
    },

    // calculate the percentage when any change in question list i.e answerd is given
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
    // Ans value given emmited by child value
    userGivenAnswer(value) {
      this.answerValue = value.ansData;
      this.isValidated = value.isFieldValid;
    },

    //  show and  hide the hint section
    updateIsHint() {
      this.isHint = !this.isHint;
    },

    // next Question will show when user enter after giving  ans
    enterClicked(ev) {
      if (ev.keyCode === 13) {
        if (this.isValidated) {
          if (this.currentIdx === this.questions.length - 1) {
            // current question is last question
            let id = this.questions[this.currentIdx].id;
            this.finishQuestion(id);
          } else {
            // current question is not last question
            let id = this.questions[this.currentIdx].id;
            this.nextQuestion(id);
          }
        } else {
          // error notifaction message
          errorhandler("Please answer the question");
        }
      }
    },

    // To move the next question in Questionnaire
    nextQuestion(id) {
      this.isHint = false;
      if (
        this.answerValue == undefined ||
        this.answerValue == null ||
        this.answerValue == ""
      ) {
        this.isValidated = false;
        // send error notification
        errorhandler("Please answer the question");
        return;
      }
      let data = {
        auth_token: this.authToken,
        question_id: id,
        answer:
          this.answerValue || this.questions[this.currentIdx].staff_anwser,
      };
      this.submitAnswer(data);
      this.isValidated = false;
      return this.currentIdx;
    },

    // finish or submit the questionnaire
    finishQuestion(id) {
      console.log(id);
      let data = {
        auth_token: this.authToken,
        question_id: id,
        answer: this.answerValue,
      };

      this.submitAnswer(data);
    },

    // got to previous Question
    prevoiusQuestion() {
      this.isHint = false;
      this.currentIdx = this.currentIdx - 1;
      this.quiz = this.questions[this.currentIdx];
      return this.currentIdx;
    },

    // submit the given answer
    submitAnswer(data) {
      QuestionnaireService.submitAnswer(data).then((res) => {
        this.questions[this.currentIdx].is_answered = true;
        if (res.data.status) {
          if (this.currentIdx >= this.questions.length - 1) {
            // close the Questionnaire  modal using vues action
            this.$store.dispatch("GET_QUIZ_MODAL_STATUS", false);
          } else {
            this.questions[this.currentIdx].is_answered = true;
            this.questions[this.currentIdx].staff_anwser = data.answer;
            this.isValidated = false;
            this.currentIdx = this.currentIdx + 1;
            this.quiz = this.questions[this.currentIdx];
          }
          this.calculateAnserdQuestion();
        } else {
          // send error notification by helper function
          errorhandler(res);
        }
      });
    },

    // calculate the percentage of question ahas been given and show that on progress bar
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
      // send percentage value of given questions to progressbar using vuex anction
      this.$store.dispatch("GET_INCREMENT_PROGRESS_VALUE", perValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.ques_descption {
  margin-bottom: 14px;
  font-size: 14px;
  line-height: 16px;
  color: #222b45;
}

.btns_wrap {
  position: absolute;
  bottom: 0px;
  right: 20px;
  background-color: white;
  padding: 8px;
  left: 0;
  right: 0;
  width: 72%;
  margin: 0 auto;
  margin-right: 0;
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
  padding: 5px 0 0 5px;
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
