import { createStore } from "vuex";
export default createStore({
  state: {
    staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
    personalInfo: [],
  },
  mutations: {
    // personal Account
    setPersonalInfo(state, per_data) {
      state.personalInfo = per_data;
    },
  },
  actions: {
    async getPersonalInfo(context, val) {
      context.commit("setPersonalInfo", val);
    },
  },
  getters: {
    personalInfo: (state) => state.personalInfo,
  },
});
// const state = {
//   staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
//   Departments: [],
//   personalInfo: [],
// };
// const mutations = {
//   // personal Account
//   setPersonalInfo(state, per_data) {
//     state.personalInfo = per_data;
//   },
// };
// const actions = {
//   async getPersonalInfo(context, val) {
//     context.commit("setPersonalInfo", val);
//   },
// };
// const getters = {
//   personalInfo: (state) => state.personalInfo,
// };
// export default { state, getters, mutations, actions };
