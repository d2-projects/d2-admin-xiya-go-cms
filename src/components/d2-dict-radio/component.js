import dict from '@/mixins/component.dict'

export default {
  name: 'd2-dict-radio',
  mixins: [ dict ],
  render () {
    const component =
      <el-radio-group { ...{ attrs: this.attrs } } vModel={ this.currentValue } on-change={ this.onChange }>
        {
          this.options.map(
            item =>
              <el-radio label={ item.value }>
                { item.label }
              </el-radio>
          )
        }
      </el-radio-group>
    return component
  }
}
