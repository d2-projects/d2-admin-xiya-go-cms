import { mapActions } from 'vuex'
import { get } from 'lodash'

export default {
  methods: {
    ...mapActions('d2admin/dict', {
      dictSet: 'set'
    }),
    /**
     * @description 加载需要的字典数据
     * @description 这个步骤会在 edit 和 create 步骤中被调用
     */
    async loadDict () {},
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
      path = 'list',
      label = 'label',
      value = 'id'
    }) {
      try {
        const result = await method(Object.assign({ page_size: 9999 }, query))
        this.dictSet({
          name,
          value: get(result, path, []).map(e => ({
            label: e[label],
            value: e[value]
          }))
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
