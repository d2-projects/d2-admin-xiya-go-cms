import dict from '@/mixins/component-dict'

export default {
  name: 'd2-dict-radio',
  mixins: [ dict ],
  props: {
    button: { type: Boolean, default: false, required: false }
  },
  render () {
    const tagName = this.button ? 'el-radio-button' : 'el-radio'
    const component =
      <el-radio-group { ...{ attrs: this.attrs } } vModel={ this.currentValue } on-change={ this.onChange }>
        {
          this.options.map(
            item =>
              <tagName label={ item.value }>
                { item.label }
              </tagName>
          )
        }
      </el-radio-group>
    return component
  }
}
