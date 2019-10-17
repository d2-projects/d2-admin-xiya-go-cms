export default {
  name: 'd2-bar-cell',
  render (createElement) {
    return createElement('div', {
      attrs: {
        'class': 'd2-bar-cell',
        'flex-box': '0'
      }
    }, [
      this.$slots.default
    ])
  }
}
