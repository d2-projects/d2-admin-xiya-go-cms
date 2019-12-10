import layoutHeaderAside from '@/layout/header-aside'
import utils from '@/utils'

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      { path: 'index', name: 'index', meta: { auth: true }, component: utils.import('system/index') },
      // 系统 前端日志
      { path: 'log', name: 'log', meta: { title: '前端日志', auth: true }, component: utils.import('system/log') },
      // 刷新页面 必须保留
      { path: 'refresh', name: 'refresh', hidden: true, component: utils.import('system/function/refresh') },
      // 页面重定向 必须保留
      { path: 'redirect/:route*', name: 'redirect', hidden: true, component: utils.import('system/function/redirect') },
      // 系统管理
      { path: 'management/user', name: 'management-user', meta: { title: '用户管理', auth: true }, component: utils.import('management/user') },
      { path: 'management/role', name: 'management-role', meta: { title: '角色管理', auth: true }, component: utils.import('management/role') },
      { path: 'management/menu', name: 'management-menu', meta: { title: '菜单管理', auth: true }, component: utils.import('management/menu') },
      { path: 'management/dept', name: 'management-dept', meta: { title: '部门管理', auth: true }, component: utils.import('management/dept') },
      { path: 'management/post', name: 'management-post', meta: { title: '岗位管理', auth: true }, component: utils.import('management/post') },
      { path: 'management/dict', name: 'management-dict', meta: { title: '字典管理', auth: true }, component: utils.import('management/dict') },
      { path: 'management/dict-data', name: 'management-dict-data', meta: { title: '字典数据', auth: true }, component: utils.import('management/dictData') },
      { path: 'management/config', name: 'management-config', meta: { title: '参数设置', auth: true }, component: utils.import('management/config') }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: utils.import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: utils.import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
