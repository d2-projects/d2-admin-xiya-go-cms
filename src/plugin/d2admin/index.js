// Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// flex 布局库
import 'flex.css'
// 组件
import '@/components'
// 过滤器
import '@/filters'
// svg 图标
import '@/assets/svg-icons'
// 国际化
import i18n from '@/i18n'

// 功能插件
import pluginApi from '@/plugin/api'
import pluginEnv from '@/plugin/env'
import pluginError from '@/plugin/error'
import pluginLodash from '@/plugin/lodash'
import pluginLog from '@/plugin/log'
import pluginOpen from '@/plugin/open'
import pluginPermission from '@/plugin/permission'

export default {
  install (Vue) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示
    // https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false
    // Element
    Vue.use(ElementUI, {
      i18n: (key, value) => i18n.t(key, value)
    })
    // 插件
    Vue.use(pluginApi)
    Vue.use(pluginEnv)
    Vue.use(pluginError)
    Vue.use(pluginLodash)
    Vue.use(pluginLog)
    Vue.use(pluginOpen)
    Vue.use(pluginPermission)
  }
}
