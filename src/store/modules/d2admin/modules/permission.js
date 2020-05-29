import { uniqueId, keys } from 'lodash'
import utils from '@/utils'
import router, { createRoutesInLayout, routesOutLayout, resetRouter } from '@/router'

export default context => {
  /**
   * 给菜单数据补充上 path 字段
   * https://github.com/d2-projects/d2-admin/issues/209
   * @param {Array} menu 原始的菜单数据
   */
  function supplementPath (menu) {
    return menu.map(e => ({
      ...e,
      path: e.path || uniqueId('d2-menu-empty-'),
      ...e.children ? {
        children: supplementPath(e.children)
      } : {}
    }))
  }
  /**
   * @description 检查一个菜单是否有子菜单
   * @param {Object} item 接口返回菜单中的一项原始数据
   */
  function hasRouteChildren (item = {}, keyname = 'children_list') {
    return utils.helper.hasChildren(item, keyname) && item[keyname].reduce((count, menu) => menu.menu_type === context.env.VUE_APP_DICT_MENU_TYPE_MENU ? ++count : count, 0) > 0
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
     * @description 依次处理原始数据，返回处理后的菜单
     * @param {Array} menus 上次处理返回的结果
     * @param {Object} sourceItem 原始数据的一项
     */
    function maker (menus, sourceItem) {
      if (!isEffectiveMenu(sourceItem)) return menus
      let menu = {}
      menu.title = sourceItem.menu_name
      menu.icon = sourceItem.icon
      menu.path = sourceItem.url
      if (hasRouteChildren(sourceItem)) menu.children = sourceItem.children_list.reduce(maker, [])
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
      const sourceItemKeys = keys(sourceItem)
      const hasAllRequiredProperties = [
        'menu_name',
        'route_name',
        'route_path',
        'route_component'
      ].reduce((res, keyname) => res && sourceItemKeys.includes(keyname), true)
      if (!hasAllRequiredProperties) return
      return true
    }
    /**
     * @description 检验是否已经注册过此路由
     * @description 在 vue-router 中路由的 name 不允许重复
     * @param {Array} registered 已经注册的路由
     * @param {Object} sourceItem 原始数据的一项
     */
    function isUnregistered (registered, sourceItem) {
      return !registered.find(item => item.name === sourceItem.route_name)
    }
    /**
     * @description 依次处理原始数据，返回处理后的路由
     * @param {Array} routes 上次处理返回的结果
     * @param {Object} sourceItem 原始数据的一项
     */
    function maker (routes, sourceItem) {
      if (hasRouteChildren(sourceItem)) {
        // 有子菜单 递归获取所有子菜单的路由
        routes = routes.concat(sourceItem.children_list.reduce(maker, []))
      } else if (isEffectiveRoute(sourceItem) && isUnregistered(routes, sourceItem)) {
        // 没有子菜单 并且这个路由没有被加入到动态路由列表 处理当前路由
        let route = {
          path: sourceItem.route_path,
          name: sourceItem.route_name,
          meta: {
            title: sourceItem.menu_name,
            auth: true,
            cache: sourceItem.route_cache === context.env.VUE_APP_DICT_IS_TRUE
          },
          component: utils.import(sourceItem.route_component)
        }
        // 为动态注册的路由可以正常在演示环境上显示源码链接而设置，如果不需要显示源码的功能，请移除此属性
        // https://github.com/d2-projects/vue-filename-injector 只处理 .vue 类型的文件 所以需要在路由上设置源码路径信息
        if (context.env.VUE_APP_SCOURCE_LINK === 'TRUE') {
          route.meta.source = 'src/views/' + sourceItem.route_component + (/(.js|.vue)$/.test(sourceItem.route_component) ? '' : '/index.js')
        }
        routes.push(route)
      }
      return routes
    }
    return menuSource.reduce(maker, [])
  }
  /**
   * @description 从接口返回的数据中计算出权限列表
   * @param {Array} menuSource 接口返回的原始菜单数据
   */
  function getPermissions (menuSource) {
    /**
     * @description 检验是否为合法权限
     * @param {Object} sourceItem 原始数据的一项
     */
    function isEffectivePermission (sourceItem) {
      if (sourceItem.menu_type !== context.env.VUE_APP_DICT_MENU_TYPE_BUTTON) return
      if (sourceItem.perms === '') return
      return true
    }
    /**
     * @description 依次处理原始数据，返回处理后的权限列表
     * @param {Array} permissions 上次处理返回的结果
     * @param {Object} sourceItem 原始数据的一项
     */
    function maker (permissions, sourceItem) {
      if (isEffectivePermission(sourceItem)) permissions.push(sourceItem.perms)
      if (utils.helper.hasChildren(sourceItem)) permissions = permissions.concat(sourceItem.children_list.reduce(maker, []))
      return permissions
    }
    return menuSource.reduce(maker, [])
  }
  return {
    namespaced: true,
    state: {
      // 是否已经加载
      isLoaded: false,
      // 用户权限
      permissions: []
    },
    actions: {
      /**
       * @description 加载用户菜单
       * @param {Object} vuex context
       * @param {Object} payload focus {Boolean} 强制重新加载动态路由 此项有值的时候加载状态校验跳过
       * @param {Object} payload to {String} 动态路由加载完成后跳转的页面
       * @param {Object} payload data {Array} 手动设置数据源 用来人工模拟权限数据或者重置权限设置 此项有值的时候登陆状态校验跳过
       */
      async load ({ state, rootState, commit, dispatch }, { focus = false, to = '', data }) {
        // 取消请求 - 没有登录
        if (!data && !rootState.d2admin.user.isLogged) return
        // 取消请求 - 已经加载过动态路由
        if (!focus && state.isLoaded) return
        // 获取接口原始数据
        const source = data || await context.api.MENU_USER()
        // [ 权限 ] 计算权限列表
        state.permissions = getPermissions(source)
        // [ 菜单 ] 计算菜单
        const menus = supplementPath(getMenus(source))
        // [ 菜单 ] 设置顶栏菜单
        commit('d2admin/menu/headerSet', menus, { root: true })
        // [ 菜单 ] 设置侧边栏菜单
        commit('d2admin/menu/asideSet', menus, { root: true })
        // [ 路由 ] 计算路由
        const routes = createRoutesInLayout(getRoutes(source)).concat(routesOutLayout)
        // [ 路由 ] 重新设置路由
        resetRouter(routes)
        // [ 路由 ] 重新设置多标签页池
        commit('d2admin/page/init', routes, { root: true })
        // [ 标签页 ] 重新计算多标签页数据
        dispatch('d2admin/page/openedLoad', { filter: true }, { root: true })
        // [ 搜索 ] 初始化搜索数据
        commit('d2admin/search/init', menus, { root: true })
        // [ 路由 ] 重新访问
        if (to) router.replace(to)
        // 标记已经加载过动态路由
        commit('isLoadedSet', true)
      },
      /**
       * @description 验证是是否包含权限
       * @param {Object} state state
       * @param {Object} payload {Array|String} need 需要的数据
       * @param {Object} payload {Boolean} all 是否需要全部包含
       */
      has ({ state }, { need = '', all = false } = {}) {
        return utils.helper[all ? 'allIn' : 'oneOf'](state.permissions, need)
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
