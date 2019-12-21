import { isArray } from 'lodash'
import utils from '@/utils'

/**
 * @description 检查一个项目是否为路由
 * @param {Object} item 接口返回菜单中的一项原始数据
 */
function isRoute (item) {
  // 设置必须的字段
  const keynamesRequired = [
    'menu_name',
    'url',
    'menu_type',
    'is_frame',
    'component'
  ]
  // 菜单类型必须为 2 这条需要在字典设置里协议
  if (item.menu_type !== 2) return false
  // 需要有必要的字段
  if (keynamesRequired.reduce((res, keyname) => (res || item[keyname] === '') ? true : false, false)) return false
  // 返回最终计算结果
  return true
}

/**
 * @description 检查一个菜单是否有子菜单
 * @param {Object} item 接口返回菜单中的一项原始数据
 */
function hasChildren (item) {
  return item.children_list && isArray(item.children_list) && item.children_list.length > 0
}

/**
 * @description 从接口返回的数据中计算出菜单
 * @param {Array} menuSource 接口返回的原始菜单数据
 */
function getMenusFromSource (menuSource) {
  // TODO visible
  function maker (sourceItem) {
    let menu = {}
    menu.title = sourceItem.menu_name
    menu.icon = sourceItem.icon
    if (hasChildren(sourceItem)) menu.children = sourceItem.children_list.map(maker)
    else menu.path = sourceItem.url
    return menu
  }
  return menuSource.map(maker)
}

/**
 * @description 从接口返回的数据中计算出路由
 * @param {Array} menuSource 接口返回的原始菜单数据
 */
function getRoutesFromSource (menuSource) {
  console.log(menuSource)
  let routes = []
  function pick (sourceItem) {
    if (isRoute(sourceItem)) {
      routes.push({
        path: sourceItem.url,
        name: 'management-dict',
        meta: {
          title: '字典管理'
        },
        component: utils.import(sourceItem.component)
      })
    }
  }
  menuSource.forEach(pick)
  return routes
}

export default context => ({
  namespaced: true,
  state: {
    isLoaded: false
  },
  actions: {
    /**
     * @description 加载用户菜单
     * @param {Object} vuex context
     */
    async load ({ state, rootState, commit }) {
      // 取消请求 - 没有登录
      if (!rootState.d2admin.user.isLogged) return
      // 取消请求 - 已经加载过动态路由
      if (state.isLoaded) return
      // 获取接口原始数据
      const result = await context.api.MENU_USER()
      // 计算菜单
      const menus = getMenusFromSource(result.menu)
      // 设置顶栏菜单
      commit('d2admin/menu/headerSet', menus, { root: true })
      // 设置侧边栏菜单
      commit('d2admin/menu/asideSet', menus, { root: true })
      // 计算路由
      const routes = getRoutesFromSource(result.menu)
      console.log(routes)
      // 标记已经加载过动态路由
      commit('isLoadedSet', true)
    }
  },
  mutations: {
    /**
     * @description 设置动态路由加载状态
     * @param {Object} state state
     * @param {Boolean} value 是否已经加载动态路由
     */
    isLoadedSet (state, value) {
      state.isLoaded = value
    }
  }
})
