// Vue
import Vue from 'vue'
import i18n from './i18n'
import dict from './dict'
import App from './App'
// store must be imported before d2Admin
import store from '@/store/index'
// core
import d2Admin from '@/plugin/d2admin'

// 菜单和路由设置
import router from './router'
import menu from '@/menu'
import menuHeader from '@/menu/header'
import { frameInRoutes } from '@/router/routes'

// 核心插件
Vue.use(d2Admin)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menu)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menu)
    // 加载接口配置
    this.$store.dispatch('d2admin/api/load')
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')
