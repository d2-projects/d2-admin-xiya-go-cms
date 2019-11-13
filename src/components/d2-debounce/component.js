// https://www.lodashjs.com/docs/latest#_debouncefunc-wait0-options

export default {
  name: 'd2-debounce',
  functional: true,
  render (createElement, context) {
    // [options.leading=false] (boolean): 指定在延迟开始前调用
    // [options.maxWait] (number): 设置 func 允许被延迟的最大值
    // [options.trailing=true] (boolean): 指定在延迟结束后调用
    const options = ({ leading = false, maxWait, trailing = true } = {}) => ({ leading, maxWait, trailing })(context.props)
    const wait = context.props.wait
    const vnodeList = context.slots().default
    if (vnodeList === undefined) {
      console.warn('<d2-debounce> 组件必须要有子元素')
      return null
    }
    const vnode = vnodeList[0] || null
    if (vnode.tag === 'button') {
      const defaultFun = vnode.data.on.click
      const debounceFun = this._.debounce(defaultFun, wait, options)
      vnode.data.on.click = debounceFun
    } else if (vnode.componentOptions && vnode.componentOptions.tag === 'el-button') {
      const defaultFun = vnode.componentOptions.listeners.click
      const debounceFun = this._.debounce(defaultFun, wait, options)
      vnode.componentOptions.listeners.click = debounceFun
    } else {
      console.warn('<d2-debounce> 组件内只能出现下面组件的任意一个且唯一 el-button、button')
      return vnode
    }
    return vnode
  }
}
