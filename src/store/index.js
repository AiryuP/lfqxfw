import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roadName: ''
  },
  mutations: {
    // set 方法
    setRoadName(state,value){
      state.roadName = value
    }
  },
  getters: {
    getRoadName: state => state.roadName
  },
  actions: {
  },
  modules: {
  }
})
