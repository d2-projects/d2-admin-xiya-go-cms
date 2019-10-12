import store from '@/store'
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import utils from '@/utils'

// 创建一个错误
function errorCreate (msg) {
  const error = new Error(msg)
  errorLog(error)
  throw error
}

// 记录和显示错误
function errorLog (error) {
  store.dispatch('d2admin/log/push', {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error
    }
  })
  if (process.env.NODE_ENV === 'development') {
    utils.log.danger('>>>>>> Error >>>>>>')
    console.error(error)
  }
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
}

const service = axios.create()

service.interceptors.response.use(
  response => {
    const dataAxios = response.data
    const { code } = dataAxios
    switch (code) {
      case 0:
        return dataAxios.data
      default:
        errorCreate(`code ${dataAxios.code} | ${dataAxios.msg} from ${response.config.url}`)
        break
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export function request (config) {
  let headers = {}
  const token = utils.cookies.get('token')
  if (token) headers['Authorization'] = `Bearer ${token}`
  headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return service({
    timeout: 5000,
    baseURL: store.state.d2admin.api.base,
    headers,
    ...config,
    data: qs.stringify(config.data)
  })
}
