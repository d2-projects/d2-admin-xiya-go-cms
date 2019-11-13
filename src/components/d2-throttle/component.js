export default {
  name: 'd2-throttle',
  functional: true,
  render (createElement, context) {
    // [options.leading=true] (boolean): 指定调用在节流开始前
    // [options.trailing=true] (boolean): 指定调用在节流结束后
    const options = ({ leading = true, trailing = true } = {}) => ({ leading, trailing })(context.props)
    const wait = context.props.wait
    const vnodeList = context.slots().default
    if (vnodeList === undefined) {
      console.warn('<d2-throttle> 组件必须要有子元素')
      return null
    }
    const vnode = vnodeList[0] || null
    if (vnode.tag === 'button') {
      const defaultFun = vnode.data.on.click
      const throttleFun = this._.throttle(defaultFun, wait, options)
      vnode.data.on.click = throttleFun
    } else if (vnode.componentOptions && vnode.componentOptions.tag === 'el-button') {
      const defaultFun = vnode.componentOptions.listeners.click
      const throttleFun = this._.throttle(defaultFun, wait, options)
      vnode.componentOptions.listeners.click = throttleFun
    } else {
      console.warn('<d2-throttle> 组件内只能出现下面组件的任意一个且唯一 el-button、button')
      return vnode
    }
    return vnode
  }
}
