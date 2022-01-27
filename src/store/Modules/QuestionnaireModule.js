const state = {
  questionnaire: {},
  questionnaireDetails: {},
  quizProgressValue: 0.0,
  randomQuestionIndex: undefined,
  questionList: [],
  getAnsweredQuestion: 0,
  categoryArray: [],
};
const mutations = {
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
  SET_CATEGORY_ARRAY(state, categories) {
    state.categoryArray = categories;
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
};
const actions = {
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
  async GET_CATEGORY_ARRAY(context, val) {
    console.log("data is comming from kkkk", val);
    context.commit("SET_CATEGORY_ARRAY", val);
  },
  async GET_INCREMENT_PROGRESS_VALUE(context, val) {
    context.commit("SET_INCREMENT_PROGRESS_VALUE", val);
  },

  GET_RANDOM_QUESTION_INDEX(context, id) {
    context.commit("SET_RANDOM_QUESTION_INDEX", id);
  },
  // questionnaire close
};
const getters = {
  quizProgressValue: (state) => state.quizProgressValue,
  questionnaireDetails: (state) => state.questionnaireDetails,
  questionnaire: (state) => state.questionnaire,
  categoryArrayItems: (state) => state.categoryArray,
  getQuestionList(state) {
    return state.questionList;
  },
  filterdCategoryList: (state) => (status) => {
    return state.categoryArray.filter(
      (category) => category.questionnaire_status === status
    );
  },
  randomQuizIndex: (state) => state.randomQuestionIndex,
};
export default { state, getters, mutations, actions };
