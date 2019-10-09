import request from '@/plugin/axios'

/**
 * 集中注册接口
 */
const filesApi = require.context('@/api', false, /\.js$/)
let settingApi = {}
filesApi.keys().forEach(key => {
  const generator = filesApi(key).default
  const apis = generator({ request })
  for (const key in apis) {
    if (apis.hasOwnProperty(key)) {
      const api = apis[key]
      settingApi[key] = api
    }
  }
})

export default {
  // 所有接口配置
  api: settingApi,
  // 网络请求方法
  request
}
