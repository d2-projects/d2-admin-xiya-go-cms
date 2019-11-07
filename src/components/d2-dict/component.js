import dict from '@/mixins/component.dict'

export default {
  name: 'd2-dict',
  mixins: [ dict ],
  render () {
    return <this.tag { ...{ attrs: this.attrs } }>{ this.currentLabel }</this.tag>
  }
}
