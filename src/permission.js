import router from '@/router'
import store from '@/store/index'
import utils from '@/utils'
import api from '@/api'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

/**
 * 路由拦截器
 */
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  try {
    // 关闭搜索面板
    store.commit('d2admin/search/set', false)
    // 确认已经加载多标签页数据 https://github.com/d2-projects/d2-admin/issues/201
    await store.dispatch('d2admin/page/isLoaded')
    // 确认已经加载组件尺寸设置 https://github.com/d2-projects/d2-admin/issues/198
    await store.dispatch('d2admin/size/isLoaded')
    // 加载参数配置 内部已经做了对登录状态和是否已经加载参数配置的判断
    await store.dispatch('d2admin/config/load')
    // 加载动态路由 内部已经做了对登录状态和是否已经加载动态路由的判断
    await store.dispatch('d2admin/router/load', { to: to.fullPath })
    // 验证当前路由所有的匹配中是否需要有验证的 由于在网络请求的钩子里有对 token 异常的判断，所以在这里不处理异常重定向
    if (to.matched.some(r => r.meta.auth)) {
      await api.USER_CHECK_TOKEN()
      next()
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    next(false)
  }
  NProgress.done()
})

router.afterEach(to => {
  // 进度条
  NProgress.done()
  // 多页控制 打开新的页面
  store.dispatch('d2admin/page/open', to)
  // 更改标题
  utils.title(to.meta.title)
})
