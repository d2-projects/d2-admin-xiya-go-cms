import multiple from '@/mixins/component-multiple'
import utils from '@/utils'

export default {
  mixins: [
    multiple
  ],
  // 注意
  // 如果包含 d2-tree 的组件引入了这个 mixin
  // 并且通过 <d2-tree v-bind="$attrs"/> 传递参数
  // 千万不要忘记下面这些参数已经不包含在 $attrs
  props: {
    // 选中或者勾选的值
    value: { type: [ String, Number, Array ], default: 0, required: false },
    // 数据源
    // 可以直接传递数组为树的数据
    // 如果传递函数，该方法需要返回 promise<Array>
    source: {
      type: [ Function, Array, String ],
      default: () => [],
      required: false
    },
    // 多选的时候 是否混合半选状态
    halfMix: { type: Boolean, default: false, required: false },
    // 标记数据源中那个字段代表节点 ID
    // d2-tree 也接收此参数作为 nodeKey 的快捷设置
    keyId: { type: String, default: 'id', required: false },
    // 标记数据源中那个字段代表节点标题
    // d2-tree 也接收此参数作为 props.label 的快捷设置
    keyLabel: { type: String, default: 'label', required: false },
    // 标记数据源中那个字段代表有子节点
    // d2-tree 也接收此参数作为 props.children 的快捷设置
    keyChildren: { type: String, default: 'children_list', required: false }
  },
  data () {
    return {
      // 树数据的扁平化结构 数组形式 为了方便其他计算使用
      flattenedArray: [],
      // 树数据的扁平化结构 对象形式 为了方便其他计算使用
      flattenedObject: {},
      // value 对应的 label 或者 label 数组
      // d2-tree 不使用这个数据
      valueLabel: '',
      valueLabels: []
    }
  },
  methods: {
    /**
     * @description 计算树数据的扁平化结构 => 数组
     * @param {Array} source 原始数据
     */
    refreshFlattenedArray (source) {
      this.flattenedArray = utils.helper.flatTreeToArray({
        data: source,
        keyChildren: this.keyChildren
      })
    },
    /**
     * @description 计算树数据的扁平化结构 => 对象
     * @param {Array} source 原始数据
     */
    refreshFlattenedObject (source) {
      this.flattenedObject = utils.helper.flatTreeToObject({
        data: source,
        keyChildren: this.keyChildren,
        keyId: this.keyId,
        includeChildren: true
      })
    },
    /**
     * @description 计算 label 或者 label 数组
     * @description 这里接收的就是原始的 value，需要做多种情况的判断
     * @param {String|Array|Number} value 需要获取 label 的值
     */
    getLabel (value) {
      if (this.multiple) this.getValueLabels(this.tryParseMultipleString(value))
      else this.getValueLabel(value)
    },
    /**
     * @description 计算 label
     * @description d2-tree 不使用这个方法
     * @param {String|Number} value 需要获取 label 的值
     */
    getValueLabel (value) {
      this.valueLabel = this._.get(this.flattenedObject, [ value, this.keyLabel ].join('.'), '')
    },
    /**
     * @description 计算 label 数组
     * @description d2-tree 不使用这个方法
     * @param {Array} value 需要获取 label 的值
     */
    getValueLabels (value) {
      this.valueLabels = value.map(this.getValueLabel)
    },
    /**
     * @description 根据 source 字段获得真实的数据值
     */
    async getDataFromSource (source) {
      let result = []
      if (this._.isArray(source)) {
        result = source
      } else if (this._.isString(source) && this._.isFunction(this.$api[source])) {
        try { result = await this.$api[source]() } catch (error) { result = [] }
      } else if (this._.isFunction(source)) {
        try { result = await source() } catch (error) { result = [] }
      }
      return result
    }
  }
}
