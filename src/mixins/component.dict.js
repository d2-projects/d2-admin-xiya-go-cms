import { cloneDeep } from 'lodash'
import { mapState, mapActions } from 'vuex'
import fieldChange from '@/mixins/el.fieldChange'

export default {
  mixins: [ fieldChange ],
  data () {
    return {
      currentValue: null,
      options: []
    }
  },
  props: {
    // 绑定的值
    value: { type: [ Number, String ], default: null, required: false },
    // 字典名
    name: { type: String, default: '', required: false },
    // [全部] 选项
    all: { type: Boolean, default: false, required: false },
    // [全部] 选项 标题
    allLabel: { type: String, default: '全部', required: false },
    // [全部] 选项 值
    allValue: { type: [ Number, String ], default: 0, required: false }
  },
  computed: {
    ...mapState('d2admin/dict', [
      'dicts'
    ]),
    currentLabel () {
      const item = this.options.find(e => e.value === this.value)
      return item ? item.label : ''
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
        this.reload()
      },
      immediate: true
    },
    value: {
      handler (value) {
        this.currentValue = cloneDeep(value)
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('d2admin/dict', {
      dictGet: 'get'
    }),
    async reload () {
      const optionItenAll = {
        label: this.allLabel,
        value: this.allValue
      }
      const options = cloneDeep(await this.dictGet(this.name))
      if (this.all) {
        options.unshift(optionItenAll)
      }
      this.options = options
    },
    onChange (value) {
      this.$emit('input', value)
      this.fieldChange()
    }
  }
}
