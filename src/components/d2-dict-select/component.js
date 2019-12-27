import dict from '@/mixins/component-dict'

export default {
  name: 'd2-dict-select',
  mixins: [ dict ],
  render () {
    const component =
      <el-select
        { ...{ attrs: this.attrs } }
        multiple={ this.multiple }
        vModel={ this.currentValue }
        on-change={ this.onChange }>
        { this.options.map(item => <el-option label={ item.label } value={ item.value }/>) }
      </el-select>
    return component
  }
}
