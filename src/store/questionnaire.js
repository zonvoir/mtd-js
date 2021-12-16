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
  },
  mutations: {
    setQuestionnaire(state, questionnaire) {
      state.questionnaire = questionnaire;
    },
    setQuestionnaireDetails(state, details) {
      state.questionnaireDetails = details;
    },
    setQuestionList(state, questionList) {
      state.questionList = questionList;
    },
    setCategoryArray(state, categories) {
      state.categoryArray = categories;
    },
    setIncrementProgressValue(state, val) {
      state.quizProgressValue = val;
    },
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
