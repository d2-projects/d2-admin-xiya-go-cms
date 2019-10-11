import utils from '@/utils'

export default {
  install (Vue, options) {
    Vue.prototype.$open = utils.open
  }
}
