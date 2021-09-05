import { createStore } from 'vuex'

export default createStore({
  state: {
    showModal: false,
    errorMessage: ''
  },
  mutations: {
    setErrorMessageAndShowModal(state, payload){
      state.errorMessage = payload;
      state.showModal = true;
    },
    hideModal(state){
      state.showModal = false;
    }
  },
  actions: {
    setErrorMessageAndShowModal({commit}, payload){
      commit('setErrorMessageAndShowModal', payload);
    },
    hideModal({commit}){
      commit('hideModal');
    }
  },
  getters: {
    showModal(state)    { return state.showModal; },
    errorMessage(state) { return state.errorMessage; },
  },
  modules: {
  }
})
