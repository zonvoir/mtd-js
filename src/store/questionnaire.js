import { createStore } from "vuex";
// import company from "./Modules/CompanyModule";
// import QuestionnaireModule from "./Modules/QuestionnaireModule";
export default createStore({
  // modules: {
  //   // company: CompanyModule,
  //   company,
  //   QuestionnaireModule,
  // },
  state: {
    staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
    tokenStatus: undefined, // auth token status
    alocatedDepartments: [], // departments allocated to perticular member
    allCategories: [], // departments allocated to perticular member
    staffsDepartment: [],
    staffsCompanies: [],
    companyMembers: [],
    role_id: undefined,
    roleInCompany: undefined,
    invitationList: [],
    activeCompany: undefined,
    questionnaire: {},
    questionnaireDetails: {},
    quizProgressValue: 0.0,
    randomQuestionIndex: undefined,
    questionList: [],
    getAnsweredQuestion: 0,
    categoryArray: [],
    personalInfo: [],
    companyInfoDetails: [],
    activeYear: "" + new Date().getFullYear(),
  },
  mutations: {
    // company profile
    setAlocatedDepartments(state, values) {
      state.alocatedDepartments = values;
    },
    setAllCategories(state, values) {
      state.allCategories = values;
    },
    setTokenStatus(state, status) {
      state.tokenStatus = status; // auth token status
    },
    // company profile
    setYear(state, values) {
      state.activeYear = values;
    },
    setStaffsDepartment(state, values) {
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
    // personal Account
    setPersonalInfo(state, per_data) {
      state.personalInfo = per_data;
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
  },
  actions: {
    // company Profile/
    GET_TOKEN_STATUS(context, val) {
      context.commit("setTokenStatus", val); // auth token status
    },
    GET_ALOCATED_DEPARTMENTS(context, val) {
      context.commit("setAlocatedDepartments", val);
    },
    GET_ALL_CATEGORIES(context, val) {
      context.commit("setAllCategories", val);
    },
    getYear(context, val) {
      context.commit("setYear", val);
    },
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
    async GET_STAFFS_DEPARTMENT(context, val) {
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
    async getPersonalInfo(context, val) {
      context.commit("setPersonalInfo", val);
    },
    // company profile close
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
      context.commit("SET_CATEGORY_ARRAY", val);
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
    allCategories: (state) => state.allCategories,
    alocatedDepartments: (state) => state.alocatedDepartments,
    activeYear: (state) => state.activeYear,
    invitationList: (state) => state.invitationList,
    activeCompany: (state) => state.activeCompany,
    companyMembers: (state) => state.companyMembers,
    staffsDepartment: (state) => state.staffsDepartment,
    staffsCompanies: (state) => state.staffsCompanies,
    personalInfo: (state) => state.personalInfo,
    roleInCompany: (state) => state.roleInCompany,
    companyInfoDetails: (state) => state.companyInfoDetails,
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
  },
});
