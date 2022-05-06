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
    internetStatus: undefined,
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem("agreedToPrivacy")) {
        state.agreedToPrivacy = true;
      }
      if (localStorage.getItem("bWFpbCI6Inpvb")) {
        state.staffDataLocal = JSON.parse(
          localStorage.getItem("bWFpbCI6Inpvb")
        );
      }
      if (navigator.onLine) {
        // this.connectionStatus = "Connected to internet.";
        state.internetStatus = true;
        console.log("Connected to internet.");
      } else {
        state.internetStatus = true;
        console.log("Unable to connect to internet.");
      }
    },

    agreePrivacyPolicy(state) {
      localStorage.setItem("agreedToPrivacy", true);
      state.agreedToPrivacy = true;
    },
    getLoadingStatus(state, val) {
      state.loadingStatus = val;
    },
    getStaffDataLocal(state, val) {
      state.staffDataLocal = val;
    },
    getInternetStatus(state, val) {
      state.internetStatus = val;
    },
  },
  actions: {
    SET_LOADING_STATUS: ({ commit }, val) => {
      commit("getLoadingStatus", val);
    },
    SET_STAFF_DATA_LOCAL: ({ commit }, val) => {
      commit("getStaffDataLocal", val);
    },
    SET_INTERNET_STATUS: ({ commit }, val) => {
      commit("getInternetStatus", val);
    },
  },
  getters: {
    internetStatus: (state) => state.internetStatus,
    staffDataLocal: (state) => state.staffDataLocal, //get local storage data
    loadingStatus: (state) => state.loadingStatus,
    agreedToPrivacyStatus: (state) => state.agreedToPrivacy,
  },
});
