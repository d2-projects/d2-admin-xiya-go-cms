export default {
  props: {
    // 多选
    multiple: { type: Boolean, default: false, required: false },
    // 是否序列为字符串
    stringify: { type: Boolean, default: false, required: false }
  },
  methods: {
    tryParseMultipleString (value) {
      if (this.multiple) {
        // 最后总应该返回数组
        if (this._.isArray(value)) {
          return value
        } else if (this.stringify && this._.isString(value)) {
          return value.split(',').filter(e => e !== '').map(Number)
        } else {
          return [ value ]
        }
      } else {
        // 最后总应该返回单个值
        if (this._.isArray(value)) {
          return value.join(',')
        } else {
          return value
        }
      }
    },
    tryStringify (value) {
      if (this._.isArray(value) && this.multiple && this.stringify) {
        return value.join(',')
      } else {
        return value
      }
    }
  }
}
