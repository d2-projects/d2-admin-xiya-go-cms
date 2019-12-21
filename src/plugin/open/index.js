import utils from '@/utils'

export default {
  install (Vue) {
    Vue.prototype.$open = utils.open
  }
}
