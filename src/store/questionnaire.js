import { createStore } from "vuex";

export default createStore({
  state: {
    questionnaire: {},
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
    getQuestionnaire(state) {
      return state.questionnaire;
    },
    getQuestionList(state) {
      return state.questionList;
    },
  },
});
