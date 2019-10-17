export default {
  name: 'd2-bar-cell',
  render (createElement) {
    return createElement('div', {
      style: {
        margin: '0 5px'
      },
      attrs: {
        'class': 'd2-bar-cell',
        'flex-box': '0'
      }
    }, [
      this.$slots.default
    ])
  }
}
