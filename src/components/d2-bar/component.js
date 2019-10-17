export default {
  name: 'd2-bar',
  render (createElement) {
    return createElement('div', {
      attrs: {
        class: 'd2-bar',
        flex: 'cross:center'
      }
    }, [
      this.$slots.default
    ])
  }
}
