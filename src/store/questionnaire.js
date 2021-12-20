import { createStore } from "vuex";

export default createStore({
  state: {
    questionnaire: {},
    questionnaireDetails: {},
    quizProgressValue: 0.0,
    randomQuestionIndex: undefined,
    questionList: [],
    getAnsweredQuestion: 0,
    categoryArray: [],
    personalInfo: [],
  },
  mutations: {
    // getQuestionnaire/categoryDetails
    setQuestionnaire(state, questionnaire) {
      state.questionnaire = questionnaire;
    },
    // question layout and category Overview
    setQuestionnaireDetails(state, details) {
      state.questionnaireDetails = details;
    },
    // getQuestionnaire/categoryDetails
    setQuestionList(state, questionList) {
      state.questionList = questionList;
    },
    // personal Account
    setPersonalInfo(state, per_data) {
      state.personalInfo = per_data;
    },
    // questionnirelist/questionnire-card
    setCategoryArray(state, categories) {
      state.categoryArray = categories;
    },
    // progressbar
    setIncrementProgressValue(state, val) {
      state.quizProgressValue = val;
    },
    // sidebar random question select
    setRandomQuestionIndex(state, id) {
      state.randomQuestionIndex = state.questionList.findIndex(
        (question) => question.id === id
      );
    },
  },
  actions: {
    async getQuestionnaire(context, val) {
      context.commit("setQuestionnaire", val);
    },
    async getPersonalInfo(context, val) {
      console.log("value", val);
      context.commit("setPersonalInfo", val);
    },
    async getQuestionnaireDetails(context, val) {
      context.commit("setQuestionnaireDetails", val);
    },
    async getQuestionList(context, val) {
      context.commit("setQuestionList", val);
    },
    async getCategoryArray(context, val) {
      context.commit("setCategoryArray", val);
    },
    async getIncrementProgressValue(context, val) {
      context.commit("setIncrementProgressValue", val);
    },

    getRandomQuestionIndex(context, id) {
      context.commit("setRandomQuestionIndex", id);
    },
  },
  modules: {},
  getters: {
    quizProgressValue: (state) => state.quizProgressValue,
    questionnaireDetails: (state) => state.questionnaireDetails,
    questionnaire: (state) => state.questionnaire,
    personalInfo: (state) => state.personalInfo,
    categoryArrayItems: (state) => state.categoryArray,
    getQuestionList(state) {
      return state.questionList;
    },
    filterdCategoryList: (state) => (status) => {
      console.log(status);
      return state.categoryArray.filter(
        (category) => category.questionnaire_status === status
      );
    },
    randomQuizIndex: (state) => state.randomQuestionIndex,
    // randomQuestionIndex(state) {
    //   return state.randomQuestionIndex;
    // },
    // return state.questionList.indexOf((question) => question.id === id);
    // return state.pages.find((pages) => pages.id === 5);
    // methods: {
    //   getSettings() {
    //     return this.$store.getters.getPageSettings(this.pageId);
    //   },
    // },
  },
});
