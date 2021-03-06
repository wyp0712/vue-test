import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
console.log(axios, 'axios')
const state = {
  count: 1,
  aString: 'ccccccc',
  companyId: 0,
  companyStatus: ''
}

const getters = {
  strLength: state => state.aString.length
}

const mutations = {
  add (state) {
    console.log('add')
    state.count += 2
  },
  reduce (state) {
    console.log('reduce')
    state.count -= 1
  }
}

const actions = {
  actionName ({ commit }) {
    // dosomething
    commit('add')
  },
  actionReduce ({ commit }) {
    // dosomething
    commit('reduce')
  },
  changeCompanyId: ({commit}, companyId) => {
    commit(companyId)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
