import Vue from 'vue'
import VueRouter from 'vue-router'
import utils from '@/utils'
import layoutHeaderAside from '@/layout/header-aside'

// fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return VueRouterPush.call(this, location).catch(err => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return VueRouterReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

/**
 * @description 创建在 layout 中显示的路由设置
 * @param {Array} routes 动态路由设置
 */
export function createRoutesInLayout (routes = []) {
  return [
    {
      path: '/',
      redirect: { name: 'index' },
      component: layoutHeaderAside,
      children: [
        { path: 'index', name: 'index', meta: { title: '首页',auth: true }, component: utils.import('system/index'), hidden: true },
        { path: 'log', name: 'log', meta: { title: '前端日志', auth: true }, component: utils.import('system/log'), hidden: true },
        ...routes
      ]
    }
  ]
}

// 在 layout 中显示的路由
const routesInLayout = createRoutesInLayout([
  { path: 'management/user', name: 'management-user', meta: { title: '用户管理', auth: true }, component: utils.import('management/user') },
  { path: 'management/role', name: 'management-role', meta: { title: '角色管理', auth: true }, component: utils.import('management/role') },
  { path: 'management/menu', name: 'management-menu', meta: { title: '菜单管理', auth: true }, component: utils.import('management/menu') },
  { path: 'management/dept', name: 'management-dept', meta: { title: '部门管理', auth: true }, component: utils.import('management/dept') },
  { path: 'management/post', name: 'management-post', meta: { title: '岗位管理', auth: true }, component: utils.import('management/post') },
  { path: 'management/dict', name: 'management-dict', meta: { title: '字典管理', auth: true }, component: utils.import('management/dict') },
  { path: 'management/dict-data', name: 'management-dict-data', meta: { title: '字典数据', auth: true }, component: utils.import('management/dictData') },
  { path: 'management/config', name: 'management-config', meta: { title: '参数设置', auth: true }, component: utils.import('management/config') }
])

// 在 layout 之外显示的路由
const routesOutLayout = [
  { path: '/refresh', name: 'refresh', component: utils.import('system/function/refresh'), hidden: true },
  { path: '/redirect/:route*', name: 'redirect', component: utils.import('system/function/redirect'), hidden: true },
  { path: '/login', name: 'login', component: utils.import('system/login'), hidden: true },
  { path: '*', name: '404', component: utils.import('system/error/404'), hidden: true }
]

export const constantRoutes = routesInLayout.concat(routesOutLayout)

/**
 * @description 创建路由
 * @param {Array} routes 路由设置
 */
const createRouter = (routes = []) => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

// 导出路由 在 main.js 里使用
const router = createRouter(constantRoutes)

/**
 * @description 重新设置路由
 * @param {Array} routes 额外追加的路由
 */
export function resetRouter(routes) {
  router.matcher = createRouter(routes).matcher
}

export default router
