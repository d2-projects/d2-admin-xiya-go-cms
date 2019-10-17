export default {
  name: 'd2-bar',
  render (createElement) {
    return createElement('div', {
      style: {
        margin: '0 -5px'
      },
      attrs: {
        class: 'd2-bar',
        flex: 'cross:center'
      }
    }, [
      this.$slots.default
    ])
  }
}
