import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    getUserToken(state) {
      return state.user.access_token;
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    SOCKET_ON_JOIN_ROOM(state) {
      console.log(state.user.username, "joined");
    }
  },
  actions: {
    SOCKET_JOIN_ROOM(context) {}
  },
  plugins: [createPersistedState()]
});
