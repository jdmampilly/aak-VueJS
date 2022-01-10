import Vuex from 'vuex'
import Vue from 'vue'
// import the auto exporter
import modules from './modules'

// Load Vuex
Vue.use(Vuex)

// Create store
export default new Vuex.Store({
  modules // all your modules automatically imported :)
})
