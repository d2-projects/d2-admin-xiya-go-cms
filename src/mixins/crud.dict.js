import { mapActions } from 'vuex'

export default {
  data () {
    return {
      status: {
        isLoadingDict: false
      }
    }
  },
  methods: {
    ...mapActions('d2admin/dict', {
      dictSet: 'set'
    }),
    /**
     * @description 加载需要的字典数据
     * @description 这个方法一般在页面上需要再次实现
     */
    async loadDict () {},
    /**
     * @description 加载一个字典
     * @param {Object} config {String} name 字典名称
     * @param {Object} config {Function} method 请求方法
     * @param {Object} config {String} fields 需要的字段
     * @param {Object} config {Object} query 请求参数
     * @param {Object} config {String} path 返回数据的列表字段位置
     * @param {Object} config {String} label 字典 label 字段名
     * @param {Object} config {String} value 字典 value 字段名
     */
    async loadDictOne ({
      name = '',
      method = () => {},
      fields = '',
      query = {},
      path = '',
      label = 'label',
      value = 'id'
    }) {
      try {
        const result = await method(
          Object.assign(
            { page_size: 9999 },
            fields ? { fields } : {},
            query
          )
        )
        let dictValue = (path ? this._.get(result, path, []) : result).map(e => ({ label: e[label], value: e[value] }))
        this.dictSet({ name, value: dictValue })
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * @description 加载一个字典
     * @description 从专门的字典接口加载
     * @param {String} name 字典 dict_type
     * @param {String} valueType  字典 dict_value_type [n|number] [s|string]
     */
    async loadDictOneFromApi (name, valueType = 'n') {
      const result = await this.$api.DICTDATA_ALL({
        page_size: 9999,
        dict_type: name
      })
      const valueKeyNameOptions = {
        n: 'dict_number',
        s: 'dict_value'
      }
      this.dictSet({
        name,
        value: result.list.map(e => ({
          label: e.dict_label,
          value: e[valueKeyNameOptions[valueType]]
        }))
      })
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
