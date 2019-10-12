import Vue from 'vue'
import d2Container from './d2-container'

Vue.component('d2-container', d2Container)

const files = require.context('./', true, /component\.vue$/)
files.keys().forEach(key => {
  const component = files(key).default
  Vue.component(component.name, component)
})
