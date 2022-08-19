import QuestionnaireService from "../../../Services/QuestionnaireServices/Questionnaire";
import errorhandler from "../../../utils/Error";
export default {
  state: {
    quizModalStatus: undefined,

    questionnaireDetails: {},
    quizProgressValue: 0.0,
    randomQuestionIndex: undefined,
    questionList: [],
    // getAnsweredQuestion: 0,
    questionnaireCategoryArray: [],
    // ///////////////////
    questionnaireCategoryDetails: {},
    questionnaireAllData: undefined,
  },
  mutations: {
    setQuizModalStatus(state, status) {
      state.quizModalStatus = status;
    },
    setQuestionnaireAllData(state, val) {
      state.questionnaireAllData = val;
    },
    // getQuestionnaire/categoryDetails
    setQuestionnaireCategoryDetails(state, val) {
      state.questionnaireCategoryDetails = val;
    },

    // question layout and category Overview
    SET_QUESTIONNAIRE_DETAILS(state, details) {
      state.questionnaireDetails = details;
    },

    // getQuestionnaire/categoryDetails
    SET_QUESTION_LIST(state, questionList) {
      state.questionList = questionList;
    },

    // questionnirelist/questionnire-card
    SET_QUESTIONNAIRE_CATEGORY_ARRAY(state, categories) {
      state.questionnaireCategoryArray = categories;
    },
    // progressbar
    SET_INCREMENT_PROGRESS_VALUE(state, val) {
      state.quizProgressValue = val;
    },

    // sidebar random question select
    SET_RANDOM_QUESTION_INDEX(state, id) {
      state.randomQuestionIndex = state.questionList.findIndex(
        (question) => question.id === id
      );
    },
  },
  actions: {
    GET_QUESTIONNAIRE_ALL_DATA({ commit }, data) {
      commit("getLoadingStatus", true, { root: true });
      return new Promise((resolve, reject) => {
        QuestionnaireService.getOneCategory(data).then(
          (res) => {
            commit("getLoadingStatus", false, { root: true });
            if (res.data.status) {
              commit("setQuestionnaireAllData", res.data.data);
              commit(
                "setQuestionnaireCategoryDetails",
                res.data.data.category_details
              );
              commit(
                "SET_QUESTIONNAIRE_DETAILS",
                res.data.data.questionnaire.detail
              );

              commit(
                "SET_QUESTION_LIST",
                res.data.data.questionnaire.questions
              );
            } else {
              errorhandler(res);
              commit("setQuestionnaireAllData", {});
              commit("SET_QUESTIONNAIRE_DETAILS", {});
              commit("SET_QUESTION_LIST", []);
            }
            resolve(res);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },

    GET_QUIZ_MODAL_STATUS(context, val) {
      context.commit("setQuizModalStatus", val); // Questionnnaire Status
    },

    GET_QUESTIONNAIRE_CATEGORY_ARRAY: ({ commit }, data) => {
      commit("getLoadingStatus", true, { root: true });

      return new Promise((resolve, reject) => {
        QuestionnaireService.getAllQuestionnireCategories(data).then(
          (res) => {
            commit("getLoadingStatus", false, { root: true });

            if (res.data.status) {
              commit("SET_QUESTIONNAIRE_CATEGORY_ARRAY", res.data.data);
            } else {
              errorhandler(res);
              commit("SET_QUESTIONNAIRE_CATEGORY_ARRAY", []);
            }
            resolve(res);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },

    async GET_INCREMENT_PROGRESS_VALUE(context, val) {
      context.commit("SET_INCREMENT_PROGRESS_VALUE", val);
    },

    GET_RANDOM_QUESTION_INDEX(context, id) {
      context.commit("SET_RANDOM_QUESTION_INDEX", id);
    },
    // questionnaire close
  },
  getters: {
    quizModalStatus: (state) => state.quizModalStatus,
    questionnaireAllData: (state) => state.questionnaireAllData,
    questionnaireCategoryDetails: (state) => state.questionnaireCategoryDetails,
    questionnaireDetails: (state) => state.questionnaireDetails,
    getQuestionList: (state) => state.questionList,
    quizProgressValue: (state) => state.quizProgressValue,
    categoryArrayItems: (state) => state.questionnaireCategoryArray,
    randomQuizIndex: (state) => state.randomQuestionIndex,
  },
};
