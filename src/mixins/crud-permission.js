export default {
  data () {
    return {
      // 默认有四个权限设置 在页面中可以覆盖
      permission: {
        query: '',
        add: '',
        edit: '',
        remove: ''
      }
    }
  },
  methods: {
    /**
     * @description 没有设置权限或者具有权限 返回 true
     * @description 设置了权限但是没有权限 返回 false
     * @param {String} name 权限名称
     * @param {Boolean} trueReturn 有权限时返回的值
     * @param {Boolean} falseReturn 没有权限时返回的值
     */
    p (name, trueReturn = true, falseReturn = false) {
      if (this.permission[name] && !this.$permission(this.permission[name])) return falseReturn
      return trueReturn
    }
  }
}
