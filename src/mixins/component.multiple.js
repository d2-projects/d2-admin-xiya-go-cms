import { isString, isArray } from 'lodash'

export default {
  props: {
    // 多选
    multiple: { type: Boolean, default: false, required: false },
    // 是否序列为字符串
    stringify: { type: Boolean, default: false, required: false }
  },
  methods: {
    tryParseMultipleString (value) {
      if (isString(value) && this.multiple && this.stringify) {
        return value.split(',').filter(e => e !== '').map(Number)
      } else {
        return value
      }
    },
    tryStringify (value) {
      if (isArray(value) && this.multiple && this.stringify) {
        return value.join(',')
      } else {
        return value
      }
    }
  }
}
