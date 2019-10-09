import request from '@/plugin/axios'

export function LOGIN ({
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
