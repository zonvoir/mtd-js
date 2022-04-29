import { createStore } from "vuex";
import commonStore from "./modules/common/common";
import questionnaireStore from "./modules/questionnaire/questionnaire";
import companyStore from "./modules/company/company";

export default createStore({
  modules: {
    commonStore,
    questionnaireStore,
    companyStore,
  },

  state: {
    agreedToPrivacy: false,
    loadingStatus: false,
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem("agreedToPrivacy")) {
        state.agreedToPrivacy = true;
      }
    },

    agreePrivacyPolicy(state) {
      localStorage.setItem("agreedToPrivacy", true);
      state.agreedToPrivacy = true;
    },

    getLoadingStatus(state, val) {
      state.loadingStatus = val;
    },
  },
  actions: {
    SET_LOADING_STATUS: ({ commit }, val) => {
      commit("getLoadingStatus", val);
    },
  },
  getters: {
    loadingStatus: (state) => state.loadingStatus,
    agreedToPrivacyStatus: (state) => state.agreedToPrivacy,
  },
});
