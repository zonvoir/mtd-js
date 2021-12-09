import { createStore } from "vuex";

export default createStore({
  state: {
    questionnaire: {},
    // categoryDetails: {},
    questionList: [],
    getAnsweredQuestion: 0,
  },
  mutations: {
    setQuestionnaire(state, questionnaire) {
      state.questionnaire = questionnaire;
    },
    setQuestionList(state, questionList) {
      state.questionList = questionList;
    },
  },
  actions: {
    async getQuestionnaire(context, val) {
      context.commit("setQuestionnaire", val);
    },

    async getQuestionList(context, val) {
      context.commit("setQuestionList", val);
    },
  },
  modules: {},
  getters: {
    questionnaire: (state) => state.questionnaire,
    questionList: (state) => state.questionList,
    getQuestionList(state) {
      return state.questionList;
    },
    // getQuestionById(state, id) {
    //   return state.questionList.indexOf((question) => question.id === id);
    //   // return state.questionList.find((question) => question.id === id);
    // },
    getQuestionById: (state) => (id) => {
      console.log(id);
      return state.questionList.findIndex((question) => question.id === id);

      // return state.questionList.indexOf((question) => question.id === id);
      // return state.pages.find((pages) => pages.id === 5);
    },
    // methods: {
    //   getSettings() {
    //     return this.$store.getters.getPageSettings(this.pageId);
    //   },
    // },
  },
});
