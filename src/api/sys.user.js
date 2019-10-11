export default ({ request }) => ({
  SYS_USER_LOGIN ({
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
  }
})
