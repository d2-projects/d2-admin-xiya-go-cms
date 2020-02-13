import permission from '@/permission'

export default {
  install (Vue) {
    // v-permission=""
    Vue.directive('permission', {
      inserted (el, binding) {
        const { modifiers, value } = binding
        const has = permission(value, modifiers)
        if (!has) el.parentNode && el.parentNode.removeChild(el)
      }
    })
    // this.$permission()
    Vue.prototype.$permission = permission
  }
}
