import screenfull from 'screenfull'

export default context => ({
  namespaced: true,
  state: {
    // 全屏激活
    active: false
  },
  mutations: {
    /**
     * @description 初始化监听
     * @param {Object} vuex context
     */
    listen (state) {
      if (screenfull.enabled) {
        screenfull.on('change', () => {
          if (!screenfull.isFullscreen) {
            state.active = false
          }
        })
      }
    },
    /**
     * @description 切换全屏
     * @param {Object} vuex context
     */
    toggle (state) {
      if (screenfull.isFullscreen) {
        screenfull.exit()
        state.active = false
      } else {
        screenfull.request()
        state.active = true
      }
    }
  }
})
