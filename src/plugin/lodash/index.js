import lodash from 'lodash'

export default {
  install (Vue) {
    Vue.prototype._ = lodash
  }
}
