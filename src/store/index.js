import Vue from 'vue'
import Vuex from 'vuex'
import generatorD2Admin from './modules/d2admin'
import api from '@/api'
import env from '@/env'
import permission from '@/permission'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    d2admin: generatorD2Admin({
      api,
      env,
      permission
    })
  }
})
