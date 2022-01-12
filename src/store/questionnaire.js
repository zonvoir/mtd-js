import { createStore } from "vuex";

export default createStore({
  state: {
    staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
    staffsDepartment: [],
    staffsCompanies: [],
    companyMembers: [],
    role_id: undefined,
    roleInCompany: undefined,
    invitationList: [],
    activeCompany: undefined,
    questionnaire: {},
    // questionnaire: {},
    questionnaireDetails: {},
    quizProgressValue: 0.0,
    randomQuestionIndex: undefined,
    questionList: [],
    getAnsweredQuestion: 0,
    categoryArray: [],
    personalInfo: [],
    companyInfoDetails: [],
  },
  mutations: {
    // company profile
    setStaffsDepartment(state, values) {
      console.log("users Departments By role Id", values);
      state.staffsDepartment = values;
    },
    setActiveCompany(state, company) {
      state.activeCompany = company;
    },
    setStaffsCompanies(state, values) {
      state.staffsCompanies = values;
    },
    setCompanyInfoDetails(state, info) {
      state.companyInfoDetails = info;
    },
    setCompanyMembers(state, values) {
      state.companyMembers = values;
    },
    setInvitationList(state, list) {
      state.invitationList = list;
    },
    setRoleId(state, role) {
      state.role_id = role;
    },
    setRoleInCompany(state, id) {
      state.roleInCompany = id;
    },
    // company profile
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
    // company Profile/
    async getInvitationList(context, val) {
      context.commit("setInvitationList", val);
    },
    async getActiveCompany(context, val) {
      context.commit("setActiveCompany", val);
    },
    async getCompanyInfoDetails(context, val) {
      context.commit("setCompanyInfoDetails", val);
    },
    async getCompanyMembers(context, val) {
      context.commit("setCompanyMembers", val);
    },
    async getStaffsDepartment(context, val) {
      context.commit("setStaffsDepartment", val);
    },
    async getStaffsCompanies(context, val) {
      context.commit("setStaffsCompanies", val);
    },
    async getRoleId(context, val) {
      context.commit("setRoleId", val);
    },
    async getRoleInCompany(context, val) {
      context.commit("setRoleInCompany", val);
    },
    // company profile
    async getQuestionnaire(context, val) {
      context.commit("setQuestionnaire", val);
    },
    async getPersonalInfo(context, val) {
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
    staffData: (state) => state.staffData,
    invitationList: (state) => state.invitationList,
    activeCompany: (state) => state.activeCompany,
    companyMembers: (state) => state.companyMembers,
    staffsDepartment: (state) => state.staffsDepartment,
    staffsCompanies: (state) => state.staffsCompanies,
    quizProgressValue: (state) => state.quizProgressValue,
    questionnaireDetails: (state) => state.questionnaireDetails,
    questionnaire: (state) => state.questionnaire,
    personalInfo: (state) => state.personalInfo,
    roleInCompany: (state) => state.roleInCompany,
    companyInfoDetails: (state) => state.companyInfoDetails,
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
  },
});
