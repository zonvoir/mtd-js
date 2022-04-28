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
    loadingStatus: false,
  },
  mutations: {
    getLoadingStatus(state, val) {
      console.log("status k", val);

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
  },
});
