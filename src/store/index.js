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
    staffDataLocal: undefined,
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem("agreedToPrivacy")) {
        state.agreedToPrivacy = true;
      }
      // if (localStorage.getItem("bWFpbCI6Inpvb")) {
      //   state.staffDataLocal = true;
      // }
    },

    agreePrivacyPolicy(state) {
      localStorage.setItem("agreedToPrivacy", true);
      state.agreedToPrivacy = true;
    },

    // getLocalStaffDataLocal(state, val) {
    //   let data = JSON.stringify(val);
    //   localStorage.setItem("bWFpbCI6Inpvb", data);
    //     state.staffDataLocal = val;
    // },

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
    //staffDataLocal: (state) => state.staffDataLocal, //get local storage data
    loadingStatus: (state) => state.loadingStatus,
    agreedToPrivacyStatus: (state) => state.agreedToPrivacy,
  },
});
