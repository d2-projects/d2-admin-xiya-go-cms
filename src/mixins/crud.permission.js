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
     */
    hasPermission (name) {
      if (this.permission[name] && !this.$permission(this.permission[name])) {
        this.$notify.error({ title: '缺少权限', message: this.permission[name] })
        return false
      }
      return true
    }
  }
}
