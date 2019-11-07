import dict from '@/mixins/component.dict'

export default {
  name: 'd2-dict',
  mixins: [ dict ],
  render () {
    return <span class="d2-dict">{ this.currentValue }</span>
  }
}
