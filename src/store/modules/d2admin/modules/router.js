import { isArray } from 'lodash'
import utils from '@/utils'
import router, { createRoutesInLayout, routesOutLayout, resetRouter } from '@/router'

export default context => {

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
  function getMenus (menuSource) {
    /**
     * @description 检验是否为合法菜单
     * @param {Object} sourceItem 原始数据的一项
     */
    function isEffectiveMenu (sourceItem) {
      if (sourceItem.menu_type !== context.env.VUE_APP_DICT_MENU_TYPE_MENU) return
      if (sourceItem.visible !== context.env.VUE_APP_DICT_VISIBLE_TRUE) return
      if (sourceItem.menu_name === '') return
      return true
    }
    /**
     * @description 依次处理原始数据，返回处理后的菜单，过滤掉无效的菜单
     * @param {Array} menus 上次处理返回的结果
     * @param {Object} sourceItem 原始数据的一项
     */
    function maker (menus, sourceItem) {
      if (!isEffectiveMenu(sourceItem)) return menus
      let menu = {}
      menu.title = sourceItem.menu_name
      menu.icon = sourceItem.icon
      if (hasChildren(sourceItem)) menu.children = sourceItem.children_list.reduce(maker, [])
      else menu.path = sourceItem.url
      menus.push(menu)
      return menus
    }
    return menuSource.reduce(maker, [])
  }

  /**
   * @description 从接口返回的数据中计算出路由
   * @param {Array} menuSource 接口返回的原始菜单数据
   */
  function getRoutes (menuSource) {
    /**
     * @description 检验是否为合法路由
     * @param {Object} sourceItem 原始数据的一项
     */
    function isEffectiveRoute (sourceItem) {
      if (sourceItem.menu_type !== context.env.VUE_APP_DICT_MENU_TYPE_MENU) return
      const hasAllRequiredProperties = [
        'menu_name',
        'route_name',
        'route_path',
        'route_component'
      ].reduce((res, keyname) => (!res || sourceItem[keyname] === '') ? false : true, true)
      if (!hasAllRequiredProperties) return
      return true
    }
    /**
     * @description 依次处理原始数据，返回处理后的路由，过滤掉无效的路由
     * @param {Array} routes 上次处理返回的结果
     * @param {Object} sourceItem 原始数据的一项
     */
    function maker (routes, sourceItem) {
      if (hasChildren(sourceItem)) {
        routes = routes.concat(sourceItem.children_list.reduce(maker, []))
      } else if (isEffectiveRoute(sourceItem)) {
        routes.push({
          path: sourceItem.route_path,
          name: sourceItem.route_name,
          meta: {
            title: sourceItem.menu_name,
            auth: true
          },
          component: utils.import(sourceItem.route_component)
        })
      }
      return routes
    }
    return menuSource.reduce(maker, [])
  }

  return {
    namespaced: true,
    state: {
      isLoaded: false
    },
    actions: {
      /**
       * @description 加载用户菜单
       * @param {Object} vuex context
       * @param {Object} payload focus {Boolean} 强制重新加载动态路由
       * @param {Object} payload to {String} 动态路由加载完成后跳转的页面
       */
      async load ({ state, rootState, commit }, { focus = false, to = '/' }) {
        // 取消请求 - 没有登录
        if (!rootState.d2admin.user.isLogged) return
        // 取消请求 - 已经加载过动态路由
        if (!focus && state.isLoaded) return
        // 获取接口原始数据
        const result = await context.api.MENU_USER()
        // [ 菜单 ] 计算菜单
        const menus = getMenus(result)
        // [ 菜单 ] 设置顶栏菜单
        commit('d2admin/menu/headerSet', menus, { root: true })
        // [ 菜单 ] 设置侧边栏菜单
        commit('d2admin/menu/asideSet', menus, { root: true })
        // [ 路由 ] 计算路由
        const routes = createRoutesInLayout(getRoutes(result)).concat(routesOutLayout)
        // [ 路由 ] 重新设置路由
        resetRouter(routes)
        // [ 路由 ] 重新设置多标签页池
        commit('d2admin/page/init', routes, { root: true })
        // [ 路由 ] 重新访问
        router.replace(to)
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
  }
}
