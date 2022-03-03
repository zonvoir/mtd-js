export default {
  state: {
    staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
    Departments: [],
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
};
