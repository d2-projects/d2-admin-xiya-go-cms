import { Message, MessageBox } from 'element-ui'
import utils from '@/utils'
import router from '@/router'

export default context => ({
  namespaced: true,
  state: {
    // 用户登录状态
    isLogged: !!utils.cookies.get('token'),
    // 用户信息
    info: {}
  },
  getters: {
    name (state) {
      return utils.fn.getFromMulti(state.info, [
        'nickname',
        'userName'
      ], '')
    }
  },
  actions: {
    /**
     * @description 登录
     * @param {Object} vuex context
     * @param {Object} payload username {String} 用户账号
     * @param {Object} payload password {String} 密码
     * @param {Object} payload route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
     */
    async login ({ commit, dispatch }, { username = '', password = '', to = '/' } = {}) {
      try {
        // 获取登录结果
        const data = await context.api.USER_LOGIN({
          username,
          password
        })
        // 设置 cookie 一定要存 uuid 和 token 两个 cookie
        // 整个系统依赖这两个数据进行校验和存储
        // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
        // token 代表用户当前登录状态 建议在网络请求中携带 token
        // 如有必要 token 需要定时更新，默认保存一天
        utils.cookies.set('uuid', data.userId)
        utils.cookies.set('token', data.token)
        // 设置用户已经登陆
        commit('isLoggedSet', true)
        // 设置 vuex 用户信息
        await dispatch('d2admin/user/set', data, { root: true })
        // 加载权限
        await dispatch('d2admin/permission/load', { focus: true, to }, { root: true })
        // 从持久化数据加载一系列的设置
        await dispatch('d2admin/sys/load', undefined, { root: true })
        // 显示提示信息
        Message({
          message: '登录成功',
          type: 'success'
        })
        // 结束
        return Promise.resolve()
      } catch (error) {
        // 结束
        return Promise.reject(error)
      }
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} vuex context
     * @param {Object} payload focus {Boolean} 强制登出 没有任何提示
     * @param {Object} payload remote {Boolean} 需要服务端登出
     * @param {Object} payload back {Boolean} 返回当前页面
     */
    logout ({ commit, dispatch }, { focus = false, remote = true, back = false } = {}) {
      /**
       * @description 注销
       */
      async function logout () {
        // 设置用户登陆状态
        commit('isLoggedSet', false)
        // 请求登出接口 不管成功与否都要进行下一步，所以不用 await 了
        if (remote) context.api.USER_LOGOUT()
        // 删除 cookie
        utils.cookies.remove('token')
        utils.cookies.remove('uuid')
        // 本地清空用户信息
        await dispatch('d2admin/user/set', {}, { root: true })
        // 计算跳转的路由
        let redirect = ''
        if (back) {
          if (['login'].indexOf(router.app.$route.name) < 0) redirect = router.app.$route.fullPath
          else redirect = router.app.$route.query.redirect
        }
        // 重置权限并且跳转到登录页 通过 back 参数指定在登陆之后是否需要跳转回原来的页面
        await dispatch('d2admin/permission/load', {
          focus: true,
          to: {
            name: 'login',
            query: redirect ? { redirect } : {}
          },
          data: []
        }, { root: true })
      }
      // 判断是否需要确认
      if (!focus) {
        commit('d2admin/gray/set', true, { root: true })
        MessageBox.confirm('确定要注销当前用户吗', '注销用户', {
          type: 'warning'
        })
          .then(() => {
            commit('d2admin/gray/set', false, { root: true })
            logout()
          })
          .catch(() => {
            commit('d2admin/gray/set', false, { root: true })
            Message({
              message: '取消注销操作'
            })
          })
      } else {
        logout()
      }
    },
    /**
     * @description 设置用户数据
     * @param {Object} vuex context
     * @param {*} info info
     */
    async set ({ state, dispatch }, info) {
      // store 赋值
      state.info = info
      // 持久化
      await dispatch('d2admin/db/set', {
        dbName: 'sys',
        path: 'user.info',
        value: info,
        user: true
      }, { root: true })
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} vuex context
     */
    async load ({ state, dispatch }) {
      // store 赋值
      state.info = await dispatch('d2admin/db/get', {
        dbName: 'sys',
        path: 'user.info',
        defaultValue: {},
        user: true
      }, { root: true })
    }
  },
  mutations: {
    /**
     * @description 设置用户登陆状态
     * @param {Object} state state
     * @param {Boolean} value 是否登录
     */
    isLoggedSet (state, value) {
      state.isLogged = value
    }
  }
})
