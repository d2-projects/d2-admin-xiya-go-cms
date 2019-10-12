import apiGenerators from '@/api'
import { request } from './service'

export default function () {
  let api = {}
  apiGenerators.forEach(generator => {
    const apiInstance = generator({
      request
    })
    for (const apiName in apiInstance) {
      if (apiInstance.hasOwnProperty(apiName)) {
        api[apiName] = apiInstance[apiName];
      }
    }
  })
  return {
    // 所有接口配置
    api,
    // 网络请求
    request
  }
}
