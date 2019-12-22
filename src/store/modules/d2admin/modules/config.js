export default context => ({
  namespaced: true,
  state: {
    isLoaded: false,
    config: {}
  },
  actions: {
    async load ({ state, rootState, commit }, { focus = false } = {}) {
      // 取消请求 - 没有登录
      if (!rootState.d2admin.user.isLogged) return
      // 取消请求 - 已经加载过参数配置
      if (!focus && state.isLoaded) return
      const result = await context.api.CONFIG_FIND(2)
      console.log(result)
    }
  },
  mutations: {
    /**
     * @description 设置参数配置加载状态
     * @param {Object} state state
     * @param {Boolean} value 是否已经加载参数配置
     */
    isLoadedSet (state, value) {
      state.isLoaded = value
    }
  }
})
