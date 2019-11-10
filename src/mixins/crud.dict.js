import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('d2admin/dict', {
      dictSet: 'set'
    }),
    /**
     * @description 加载需要的字典数据
     * @description 这个方法一般在页面上需要再次实现
     */
    async loadDict () {
      // eg
      // await this.loadDictOne({
      //   name: 'user_post',
      //   method: this.$api.POST_ALL,
      //   query: { fields: 'id,post_name' },
      //   label: 'post_name'
      // })
    },
    /**
     * @description 加载一个字典
     * @param {Object} config {String} name 字典名称
     * @param {Object} config {Function} method 请求方法
     * @param {Object} config {Object} query 请求参数
     * @param {Object} config {String} label 字典 label 字段名
     * @param {Object} config {String} value 字典 value 字段名
     */
    async loadDictOne ({
      name = '',
      method = () => {},
      query = {},
      path = '',
      label = 'label',
      value = 'id'
    }) {
      try {
        const result = await method(Object.assign({ page_size: 9999 }, query))
        let dictValue = (path ? this.$_.get(result, path, []) : result).map(e => ({ label: e[label], value: e[value] }))
        this.dictSet({ name, value: dictValue })
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * @description 请求字典数据
     * @param {Function} fn 请求函数 需要返回 Promise
     */
    async doLoadDict (fn = () => {}) {
      this.status.isLoadingDict = true
      try {
        const data = await fn()
        this.status.isLoadingDict = false
        return Promise.resolve(data)
      } catch (error) {
        console.log(error)
        this.status.isLoadingDict = false
        return Promise.reject(error)
      }
    }
  }
}
