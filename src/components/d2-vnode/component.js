export default {
  name: 'd2-vnode',
  functional: true,
  props: {
    render: Function
  },
  render: (h, ctx) => ctx.props.render(h)
}
