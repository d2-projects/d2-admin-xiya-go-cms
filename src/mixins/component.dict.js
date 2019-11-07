import { cloneDeep } from 'lodash'
import { mapActions } from 'vuex'
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
    value: {
      type: [ Number, String ],
      default: null,
      required: false
    },
    name: {
      type: String,
      default: '',
      required: false
    },
    tag: {
      type: String,
      default: 'span',
      required: false
    },
    // 增加 [全部] 选项
    all: {
      type: Boolean,
      default: false,
      required: false
    },
    // 增加 [全部] 选项
    // [全部] 选项的标题
    allLabel: {
      type: String,
      default: '全部',
      required: false
    },
    // 增加 [全部] 选项
    // [全部] 选项的值
    allValue: {
      type: [ Number, String ],
      default: 0,
      required: false
    }
  },
  computed: {
    currentLabel () {
      const item = this.options.find(e => e.value === this.value)
      return item ? item.label : ''
    },
    attrs () {
      const defaultAttrs = {
        placeholder: '123'
      }
      return Object.assign(defaultAttrs, this.$attrs)
    }
  },
  watch: {
    name: {
      async handler (name) {
        const optionItenAll = {
          label: this.allLabel,
          value: this.allValue
        }
        const options = cloneDeep(await this.dictGet(name))
        if (this.all) {
          options.unshift(optionItenAll)
        }
        this.options = options
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
    onChange (value) {
      this.$emit('input', value)
      this.fieldChange()
    }
  }
}
