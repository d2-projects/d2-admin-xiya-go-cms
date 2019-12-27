import dict from '@/mixins/component-dict'

export default {
  name: 'd2-dict',
  mixins: [ dict ],
  props: {
    // 标签名
    tag: {
      type: String,
      default: 'span',
      required: false
    }
  },
  render () {
    return <this.tag { ...{ attrs: this.attrs } }>{ this.currentLabel }</this.tag>
  }
}
