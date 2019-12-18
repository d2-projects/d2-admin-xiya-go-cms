import router from '@/router'
import store from '@/store/index'
import utils from '@/utils'
import api from '@/api'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
  // 确认已经加载多标签页数据 https://github.com/d2-projects/d2-admin/issues/201
  await store.dispatch('d2admin/page/isLoaded')
  // 确认已经加载组件尺寸设置 https://github.com/d2-projects/d2-admin/issues/198
  await store.dispatch('d2admin/size/isLoaded')
  // 进度条
  NProgress.start()
  // 关闭搜索面板
  store.commit('d2admin/search/set', false)
  // 验证当前路由所有的匹配中是否需要有登录验证的
  // 由于在网络请求的钩子里有对 token 异常的判断，所以在这里不处理异常重定向
  // 如果网络请求中没有处理登录异常，请在 catch 中添加注销逻辑
  // 例如在 catch 中：
  // store.dispatch('d2admin/user/logout', {
  //   focus: true,
  //   remote: false,
  //   back: true
  // })
  if (to.matched.some(r => r.meta.auth)) {
    try {
      await api.USER_CHECK_TOKEN()
      next()
    } catch (error) {
      next(false)
    }
    NProgress.done()
  } else {
    next()
  }
})

router.afterEach(to => {
  // 进度条
  NProgress.done()
  // 多页控制 打开新的页面
  store.dispatch('d2admin/page/open', to)
  // 更改标题
  utils.title(to.meta.title)
})
