import { mapState, mapActions } from 'vuex'
import fieldChange from '@/mixins/el-field-change'
import multiple from '@/mixins/component-multiple'

export default {
  mixins: [
    fieldChange,
    multiple
  ],
  data () {
    return {
      currentValue: '',
      options: []
    }
  },
  props: {
    // 绑定的值
    // 注意 这里不能默认值是 null
    // https://github.com/ElemeFE/element/issues/8615
    // 字典是数字类型的请在外部设置默认 0 字符设置默认空字符串
    value: { type: [ Number, String, Array ], default: '', required: false },
    // 字典名
    name: { type: String, default: '', required: false },
    // [自动加载字典] 自定义字典数据 设置为 false 时会自动加载对应名称的字典
    custom: { type: Boolean, default: false, required: false },
    // [全部] 选项
    all: { type: Boolean, default: false, required: false },
    // [全部] 选项 标题
    allLabel: { type: String, default: '全部', required: false },
    // [全部] 选项 值
    allValue: { type: [ Number, String ], default: undefined, required: false }
  },
  computed: {
    ...mapState('d2admin/dict', [
      'dicts'
    ]),
    currentLabel () {
      if (this.multiple) {
        const num = this.tryParseMultipleString(this.value).length
        return `${num} 个项目`
      } else {
        const item = this.options.find(e => e.value === this.value)
        return item ? item.label : ''
      }
    },
    attrs () {
      const defaultAttrs = {
        placeholder: '请选择'
      }
      return Object.assign(defaultAttrs, this.$attrs)
    }
  },
  watch: {
    dicts () {
      this.reload()
    },
    name: {
      handler () {
        if (!this.custom) this.fetch()
        this.reload()
      },
      immediate: true
    },
    value: {
      handler (value) {
        this.currentValue = this.tryParseMultipleString(value)
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('d2admin/dict', {
      dictGet: 'get',
      dictFetch: 'fetch'
    }),
    fetch () {
      this.dictFetch(this.name)
    },
    async reload () {
      // 从全局状态管理中获取字典值的列表
      const options = this._.cloneDeep(await this.dictGet(this.name))
      // 需要有默认值选项
      if (this.all) {
        // 默认值选项
        options.unshift({
          label: this.allLabel,
          value: (() => {
            // 组件设置了默认值的值
            if (this.allValue !== undefined) return this.allValue
            // 组件没有设置默认值的值
            else {
              // 工具方法 如果是 undefined 就返回第二个参数
              const valueOr = (v, d) => v === undefined ? d : v
              // 推算默认值使用的类型默认值设置
              const settign = {
                number: valueOr(this.$env.VUE_APP_DICT_EMPTY_NUMBER, 0),
                string: valueOr(this.$env.VUE_APP_DICT_EMPTY_STRING, '')
              }
              // 允许的字典值类型
              const allow = Object.keys(settign)
              // 字典的数据类型
              let type = allow[0]
              if (options.length > 0) {
                // 第一个选项值的数据类型
                const type0 = typeof (options[0].value)
                // 如果数据类型在允许的范围内 更新外层的字典数据类型
                if (allow.indexOf(type0) >= 0) type = type0
              }
              return settign[type]
            }
          })()
        })
      }
      this.options = options
    },
    onChange (value) {
      const result = this.tryStringify(value)
      this.$emit('input', result)
      this.$emit('change', result)
      this.fieldChange()
    }
  }
}
