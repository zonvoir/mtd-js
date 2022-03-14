import QuestionnaireService from "../../../Services/QuestionnaireServices/Questionnaire";
import errorhandler from "../../../utils/Error";
export default {
  state: {
    staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
    tokenStatus: undefined, // auth token status
    // company States end
    questionnaire: {},
    questionnaireDetails: {},
    quizProgressValue: 0.0,
    randomQuestionIndex: undefined,
    questionList: [],
    getAnsweredQuestion: 0,
    questionnaireCategoryArray: [],
    // personalInfo: [],
  },
  mutations: {
    setTokenStatus(state, status) {
      state.tokenStatus = status; // auth token status
    },

    // getQuestionnaire/categoryDetails
    SET_QUESTIONNAIRE(state, questionnaire) {
      state.questionnaire = questionnaire;
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
    // company Profile/
    GET_TOKEN_STATUS(context, val) {
      context.commit("setTokenStatus", val); // auth token status
    },
    // questionnaire start
    async GET_QUESTIONNAIRE(context, val) {
      context.commit("SET_QUESTIONNAIRE", val);
    },
    async GET_QUESTIONNAIRE_DETAILS(context, val) {
      context.commit("SET_QUESTIONNAIRE_DETAILS", val);
    },
    async GET_QUESTIONLIST(context, val) {
      context.commit("SET_QUESTION_LIST", val);
    },
    // async GET_QUESTIONNAIRE_CATEGORY_ARRAY(context, val) {
    //   context.commit("SET_QUESTIONNAIRE_CATEGORY_ARRAY", val);
    // },
    GET_QUESTIONNAIRE_CATEGORY_ARRAY: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        QuestionnaireService.getAllQuestionnireCategories(data).then(
          (res) => {
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
    tokenStatus: (state) => state.tokenStatus, // auth token status
    staffData: (state) => state.staffData, //get local storage data
    quizProgressValue: (state) => state.quizProgressValue,
    questionnaireDetails: (state) => state.questionnaireDetails,
    questionnaire: (state) => state.questionnaire,
    categoryArrayItems: (state) => state.questionnaireCategoryArray,
    allCategories: (state) => state.allCategories,
    getQuestionList: (state) => state.questionList,
    filterdCategoryList: (state) => (status) => {
      return state.questionnaireCategoryArray.filter(
        (category) => category.questionnaire_status === status
      );
    },
    randomQuizIndex: (state) => state.randomQuestionIndex,
  },
};
