import Vue from 'vue';
import Vuex from 'vuex';
import { getUser } from '@/services/users';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    isLoggedIn: false,
    menuOpen: false,
    user: {},
    authorized: false,
  },
  getters: {
    getIsLoggedIn: (state) => state.isLoggedIn,
    getMenuStatus: (state) => state.menuOpen,
    getUser: (state) => {
      console.log(state.user);
      return state.user
    } ,
  },
  mutations: {
    changeLoginStatus(state, { status }) {
      state.isLoggedIn = status;
    },
    changeMenuStatus(state) {
      state.menuOpen = !state.menuOpen;
    },
    changeUser(state, { user }) {
      if ((!!user.status && user.status === 401)) {
        state.user = {};
        state.isLoggedIn = false;
        state.menuOpen = false;
      } else {
        state.user = user;
      }
    }
  },
  actions: {
    commitLoginStatus({ commit }, payload) {
      commit('changeLoginStatus', payload);
    },
    commitMenuStatus({ commit }) {
      commit('changeMenuStatus');
    },
    async commitUser({ commit }, payload) {
      const user = await getUser();
      commit('changeUser', { user });
      return user;
    }
  },
  modules: {
  },
});
