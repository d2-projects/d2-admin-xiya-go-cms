import { isArray, isString, isFunction } from 'lodash'

export default {
  // 注意
  // 如果包含 d2-tree 的组件引入了这个 mixin
  // 并且通过 <d2-tree v-bind="$attrs"/> 传递参数
  // 千万不要忘记下面这些参数已经不包含在 $attrs
  props: {
    // 选中或者勾选的值
    value: { type: [ Number, Array ], default: 0, required: false },
    // 数据源
    // 可以直接传递数组为树的数据
    // 如果传递函数，该方法需要返回 promise<Array>
    source: {
      type: [ Function, Array, String ],
      default: () => [],
      required: false
    },
    // 是否多选
    multiple: { type: Boolean, default: false, required: false },
    // 标记数据源中那个字段代表节点 ID
    // d2-tree 不使用这个参数 此参数是 d2-tree-popover 这类组件计算显示文字使用的
    // d2-tree 的这个参数在 nodeKey
    keyId: { type: String, default: 'id', required: false },
    // 标记数据源中那个字段代表节点标题
    // d2-tree 不使用这个参数 此参数是 d2-tree-popover 这类组件计算显示文字使用的
    // d2-tree 的这个参数在 props.label
    keyLabel: { type: String, default: 'menu_name', required: false },
    // 标记数据源中那个字段代表有子节点
    // d2-tree 不使用这个参数 此参数是 d2-tree-popover 这类组件在 getSourceFlat 中使用的
    // d2-tree 的这个参数在 props.children
    keyChildren: { type: String, default: 'children_list', required: false }
  },
  data () {
    return {
      // 树数据的扁平化结构
      // d2-tree 不使用这个数据
      sourceFlat: [],
      // value 对应的 label 或者 label 数组
      // d2-tree 不使用这个数据
      valueLabel: '',
      valueLabels: []
    }
  },
  methods: {
    /**
     * @description 计算树数据的扁平化结构
     * @description d2-tree 不使用这个方法
     */
    getSourceFlat (sourceArray) {
      let result = []
      const push  = tempArray => {
        tempArray.forEach(item => {
          if (item[this.keyChildren].length > 0) {
            result.push(item)     
            push(item[this.keyChildren])
          } else {
            result.push(item)            
          }
        })
      }
      push(sourceArray)
      this.sourceFlat = result
    },
    /**
     * @description 计算 label 或者 label 数组
     */
    getLabel (value) {
      if (this.multiple) {
        this.getValueLabels(value)
      } else {
        this.getValueLabel(value)
      }
    },
    /**
     * @description 计算 label
     * @description d2-tree 不使用这个方法
     */
    getValueLabel (value) {
      let result = ''
      const find = this.sourceFlat.find(item => item[this.keyId] === value)
      result = find ? find[this.keyLabel] : result
      this.valueLabel = result
    },
    /**
     * @description 计算 label 数组
     * @description d2-tree 不使用这个方法
     */
    getValueLabels (value) {
      let result = []
      this.valueLabels = result
    },
    /**
     * @description 根据 source 字段获得真实的数据值
     */
    async getDataFromSource (source) {
      let result = []
      if (isArray(source)) {
        result = source
      } else if (isString(source) && isFunction(this.$api[source])) {
        try { result = await this.$api[source]() }
        catch (error) { result = [] }
      } else if (isFunction(source)) {
        try { result = await source() }
        catch (error) { result = [] }
      }
      return result
    }
  }
}
