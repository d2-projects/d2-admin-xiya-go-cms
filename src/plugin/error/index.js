import store from '@/store'
import utils from '@/utils'
import env from '@/env'

export default {
  install (Vue) {
    Vue.config.errorHandler = function (error, instance, info) {
      Vue.nextTick(() => {
        // store 追加 log
        store.dispatch('d2admin/log/push', {
          message: `${info}: ${error.message}`,
          type: 'danger',
          meta: {
            error,
            instance
          }
        })
        // 只在开发模式下打印 log
        if (env.NODE_ENV === 'development') {
          utils.log.capsule('D2Admin', 'ErrorHandler', 'danger')
          utils.log.danger('>>>>>> 错误信息 >>>>>>')
          console.log(info)
          utils.log.danger('>>>>>> Vue 实例 >>>>>>')
          console.log(instance)
          utils.log.danger('>>>>>> Error >>>>>>')
          console.log(error)
        }
      })
    }
  }
}
