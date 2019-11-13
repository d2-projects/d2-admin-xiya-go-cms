import lodash from 'lodash'

export default {
  install (Vue, options) {
    Vue.prototype._= lodash
  }
}
