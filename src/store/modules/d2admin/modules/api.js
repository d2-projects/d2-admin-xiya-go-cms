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

const base = process.env.VUE_APP_API || optionsEnv.length > 0 ? optionsEnv[0].value : ''

export default context => ({
  namespaced: true,
  state: {
    // 网络请求地址
    base,
    // env 中设置的地址选项
    optionsEnv
  },
  mutations: {
    /**
     * @description 改变网络请求地址
     * @param {Object} context
     */
    set (state, value) {
      state.base = value
    }
  }
})
