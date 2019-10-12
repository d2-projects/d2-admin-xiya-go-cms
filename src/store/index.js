import Vue from 'vue'
import Vuex from 'vuex'
import generatorD2Admin from './modules/d2admin'
import context from '@/context.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    d2admin: generatorD2Admin(context())
  }
})
