import { Notification, Message } from 'element-ui'

const optionsEnv = Object.keys(process.env)
  .filter(keyName => /^VUE_APP_API_\d+_\w+$/.test(keyName))
  .map(keyName => {
    const [index, ...name] = keyName.replace('VUE_APP_API_', '').split('_')
    return {
      index: Number(index),
      name: name.join('_'),
      value: process.env[keyName]
    }
  })
  .sort((a, b) => a.index - b.index)
  .map(e => ({
    name: e.name,
    value: e.value
  }))

const base = process.env.VUE_APP_API || optionsEnv.length > 0 ? optionsEnv[0].value : ''

export default context => ({
  namespaced: true,
  state: {
    // 网络请求地址
    base,
    // env 中设置的地址选项
    optionsEnv,
    // 用户自己添加的地址
    optionsUser: []
  },
  getters: {
    // 混合系统提供的地址和用户自己设置的地址记录
    options (state) {
      // Array item
      // - name
      // - value
      return [
        ...state.optionsUser,
        ...state.optionsEnv
      ]
    }
  },
  mutations: {
    /**
     * @description 改变网络请求地址
     * @param {Object} state
     * @param {String} value
     */
    set (state, value) {
      if (state.base === value) return
      const findIndex = [
        ...state.optionsEnv,
        ...state.optionsUser
      ].map(e => e.value).indexOf(value)
      if (findIndex === -1) {
        state.optionsUser.push({
          name: '自定义',
          value
        })
      }
      state.base = value
      Notification({
        title: '接口地址变更',
        message: value
      })
    },
    /**
     * @description 删除一个地址配置
     * @param {Object} state
     * @param {String} value
     */
    remove (state, value) {
      if (state.optionsUser.length + state.optionsEnv.length > 1) {
        [
          'optionsEnv',
          'optionsUser'
        ].forEach(optionName => {
          const index = state[optionName].map(e => e.value).indexOf(value)
          if (index >= 0) {
            state[optionName].splice(index, 1)
            Message({
              message: `${value} 已经删除`,
              type: 'success'
            })
          }
        })
      } else {
        Message({
          message: '至少保留一项设置',
          type: 'warning'
        })
      }
    }
  }
})
