import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accountId: null,
  },
  mutations: {
    setAccountId(state, accountId) {
      state.accountId = accountId;
    },
    removeAccountId(state) {
      state.accountId = null;
    },
  },
  actions: {
    setAccountId({ commit }, accountId) {
      commit("setAccountId", accountId);
    },
    removeAccountId({ commit }) {
      commit("removeAccountId");
    },
  },
});
