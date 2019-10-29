export default ({ request }) => ({
  /**
   * @description 登录
   * @param {Object} data {String} username 用户名
   * @param {Object} data {String} password 密码
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
   */
  USER_LOGOUT () {
    return request({
      url: '/api/user/logout',
      method: 'post'
    })
  },
  /**
   * @description Token 校验
   */
  USER_CHECK_TOKEN () {
    return request({
      url: '/api/user/check_token',
      method: 'post'
    })
  },
  /**
   * @description 查询所有用户
   * @param {Object} query 查询参数
   */
  USER_ALL (query = {}) {
    return request({
      url: '/api/user/index',
      method: 'post',
      data: query
    })
  }
})
