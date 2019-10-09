import context from '@/context.js'

export default {
  install (Vue, options) {
    Vue.prototype.$api = context.api
  }
}
