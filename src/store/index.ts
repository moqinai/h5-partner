import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tips: {
      show: false,
      title: ''
    },
    loading: true
  },
  mutations: {
    changeTips (state, tips) {
      state.tips = tips
      setTimeout(() => {
        state.tips.show = false
      }, 1500)
    }
  },
  actions: {
    checkout({commit}) {
    }
  },
  modules: {
    login
  }
});

Vue.use(Vuex)
