import { createStore } from "vuex";

export default createStore({
  state: {
    staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
    memberPic: "hello from vuex state",
  },
  mutations: {
    updateMemberProfile(state, newProfilePic) {
      state.memberPic = newProfilePic;
    },
  },
  actions: {
    // updateLoadingStatus({ commit }) {
    //   commit('loadingStatus',true)
    // }
  },
  modules: {},
  getters: {
    updateMemberProfile(state) {
      return state.memberPic;
    },
  },
});
