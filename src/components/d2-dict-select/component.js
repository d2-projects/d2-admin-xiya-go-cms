import dict from '@/mixins/component.dict'

export default {
  name: 'd2-dict-select',
  mixins: [ dict ],
  render () {
    const component =
      <el-select vModel={ this.currentValue } placeholder="请选择" on-change={ this.onChange }>
        { this.options.map(item => <el-option label={ item.label } value={ item.value }/>) }
      </el-select>
    return component
  }
}
