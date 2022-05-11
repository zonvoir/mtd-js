<template>
  <div class="">
    <div v-if="questionList && questionList.length" class="team_wrapper m-b-20">
      <div class="m-b-14">
        <h4 class="m-b-0 title-dark">
          {{ $t("category_details.questionTab.Questions") }}
        </h4>
      </div>

      <div class="question_list_wrapper">
        <div class="list_wrap m-b-20">
          <ul class="list-group">
            <li
              v-for="(question, idx) in questionList"
              :key="question.id"
              class="d-inline-flex"
            >
              <div class="list_wrapper">
                <div class="list_counter_wrap">
                  <div
                    :class="question.is_answered ? 'bg_success' : 'bg-gray-0'"
                    class="counter_status m-r-13"
                  >
                    <span class="q_no">{{ idx + 1 }}</span>
                    <span class="q_check_icon">
                      <img
                        v-if="question.is_answered"
                        src="K_Icons/checkmark-circle-fill.svg"
                        alt=""
                        class="check_icon"
                      />
                    </span>
                  </div>

                  <div class="">
                    <p class="m-b-0 ques_title">
                      {{ question.name }}
                    </p>
                    <p v-if="question.is_answered" class="m-b-0 ques_ans">
                      {{ getValueOfAns(question) }}
                    </p>
                  </div>
                </div>
                <div class="list_action m-l-auto">
                  <button
                    v-if="
                      question.is_answered &&
                      questionnaireDetails.is_editable_own
                    "
                    @click="editQuetion(question.id)"
                    class="
                      btn
                      text-primary
                      fs-16
                      text-capitalize
                      fw-500
                      btn-transaprent
                    "
                  >
                    {{ $t("category_details.questionTab.buttons.edit") }}
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else class="no_questionnaire_list">
      <h6 class="empty_list_warning">Question list is empty</h6>
    </div>
  </div>
  <QuestionnaireModal ref="questinnaire_comp" />
</template>

<script>
// import QuestionnaireService from "../../Services/QuestionnaireServices/Questionnaire";
// import errorhandler from "../../utils/Error";
import QuestionnaireModal from "../Questionnarie/QuestionnaireModal.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      optionsArr: [],
      questionnaire: {},
      isEditable: undefined,
    };
  },

  components: {
    QuestionnaireModal,
  },

  computed: {
    ...mapGetters({
      questionnaireDetails: "questionnaireDetails",
      questionList: "getQuestionList",
    }),
  },

  // mounted() {
  //   this.departmentId = this.$route.params.did;
  //   this.categoryID = this.$route.params.id;
  //   this.authToken = this.staffData.auth_token;
  //   if (this.departmentId && this.categoryID && this.authToken) {
  //     let data = {
  //       auth_token: this.authToken,
  //       department_id: this.departmentId,
  //       category_id: this.categoryID,
  //     };
  //     this.getDeptAndCategoryDetails(data);
  //   }
  // },

  methods: {
    getDeptAndCategoryDetails(data) {
      this.$store.dispatch("GET_QUESTIONNAIRE_ALL_DATA", data);

      // this.$store.dispatch("SET_LOADING_STATUS", true);
      // QuestionnaireService.getOneCategory(data).then((res) => {
      //   this.$store.dispatch("SET_LOADING_STATUS", false);
      //   if (res.data.status) {
      //     this.optionsArr = res.data.data.questionnaire.questions;
      //     this.questionList = res.data.data.questionnaire.questions;
      //     this.questionnaireDetails = res.data.data.questionnaire.detail;
      //   } else {
      //     errorhandler(res);
      //   }
      // });
    },
    getValueOfAns(value) {
      if (value.type === "text") {
        return value.staff_anwser;
      } else if (value.type === "multiple_choice") {
        let ansArr = [];
        value.staff_anwser.forEach((element) => {
          let ans = value.choices.find((item) => {
            return item.option_id === element;
          });
          ansArr.push(ans.choices);
        });
        return ansArr.toString();
      } else if (value.type === "radio_button") {
        let ansArr = [];
        value.staff_anwser.forEach((element) => {
          let ans = value.choices.find((item) => {
            return item.option_id === element;
          });
          ansArr.push(ans.choices);
        });
        return ansArr.toString();
      } else if (value.type === "multi_number") {
        let ansArr = [];
        value.staff_anwser.forEach((element) => {
          ansArr.push(element["sub_ans"]);
        });
        return ansArr.toString();
      } else if (value.type === "percent") {
        let ansArr = [];
        value.staff_anwser.forEach((element) => {
          ansArr.push(element["sub_ans"]);
        });
        return ansArr.toString();
      } else if (value.type === "number") {
        return value.staff_anwser;
      } else if (value.type === "phone_number") {
        return value.staff_anwser;
      } else if (value.type === "website") {
        return value.staff_anwser;
      } else if (value.type === "date") {
        return value.staff_anwser;
      } else if (value.type === "dropdown") {
        let tempChoice = value.choices.find((item) => {
          return item.option_id === value.staff_anwser[0];
        });
        return tempChoice.choices;
      } else if (value.type === "email") {
        return value.staff_anwser;
      } else if (value.type === "yes_no") {
        return value.staff_anwser;
      }
    },
    editQuetion(id) {
      this.$store.dispatch("GET_RANDOM_QUESTION_INDEX", id);
      this.$store.dispatch("GET_QUIZ_MODAL_STATUS", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.ques_title {
  font-size: 12px;
  font-weight: 400;
  color: #8f9bb3;
  text-align: left;
  line-height: 14px;
}
.ques_ans {
  font-size: 12px;
  line-height: 14px;
  font-weight: 400;
  color: #000000;
}
.q_no {
  color: #f9f9f9;
  font-size: 14px;
  font-weight: 500;
  margin-right: 16px;
}
.counter_status {
  border-radius: 2px;
  padding: 4px;
  display: flex;
  width: 52px;
  height: 28px;
  align-items: center;
}

li {
  margin-bottom: 27px;
  &:last-child {
    margin-bottom: 0 !important;
  }
}
.list_wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  .list_counter {
  }
  .list_action {
  }
}
.list_counter_wrap {
  display: flex;
}
.list_group_item {
  border: 1px solid #e4e9f2;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 6px 8px 6px 14px;
}
.q_check_icon {
  width: 16px;
  height: 16px;
  position: relative;
}
.check_icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.team_wrapper {
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  padding: 20px 33px;
}
</style>
