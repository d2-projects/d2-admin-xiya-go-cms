export default ({ request }) => ({
  /**
   * @description 登录
   * @description http://yapi.xiya.vip/project/11/interface/api/10
   */
  USER_LOGIN ({
    username = '',
    password = ''
  }) {
    return request({
      url: '/api/user/login',
      method: 'post',
      data: {
        user_name: username,
        password: password
      }
    })
  },
  /**
   * @description 注销
   * @description http://yapi.xiya.vip/project/11/interface/api/40
   */
  USER_LOGOUT () {
    return request({
      url: '/api/user/logout',
      method: 'post'
    })
  },
  /**
   * @description Token 校验
   * @description http://yapi.xiya.vip/project/11/interface/api/15
   */
  USER_CHECK_TOKEN () {
    return request({
      url: '/api/user/check_token',
      method: 'post'
    })
  },
  /**
   * @description 查询所有用户
   * @description http://yapi.xiya.vip/project/11/interface/api/30
   */
  USER_ALL (query = {}) {
    return request({
      url: '/api/user/index',
      method: 'post',
      data: query
    })
  },
  /**
   * @description 用户创建
   * @description http://yapi.xiya.vip/project/11/interface/api/25
   */
  USER_CREATE (data) {
    return request({
      url: '/api/user/create',
      method: 'put',
      data
    })
  },
  /**
   * @description 用户详情
   * @description http://yapi.xiya.vip/project/11/interface/api/240
   */
  USER_DETAIL (id) {
    return request({
      url: '/api/user/update',
      method: 'post',
      data: {
        id
      }
    })
  },
  /**
   * @description 用户编辑
   * @description http://yapi.xiya.vip/project/11/interface/api/240
   */
  USER_UPDATE (data) {
    return request({
      url: '/api/user/update',
      method: 'put',
      data
    })
  },
  /**
   * @description 用户删除
   * @description http://yapi.xiya.vip/project/11/interface/api/155
   */
  USER_DELETE (id) {
    return request({
      url: '/api/user/delete',
      method: 'delete',
      data: {
        id
      }
    })
  }
})
