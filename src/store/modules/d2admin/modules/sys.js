export default context => ({
  namespaced: true,
  actions: {
    /**
     * @description 从持久化数据加载一系列的设置
     * @param {Object} vuex context
     */
    async load ({ dispatch }) {
      // 加载用户名
      await dispatch('d2admin/user/load', undefined, { root: true })
      // 加载主题
      await dispatch('d2admin/theme/load', undefined, { root: true })
      // 加载页面过渡效果设置
      await dispatch('d2admin/transition/load', undefined, { root: true })
      // 加载上次退出时的多页列表
      await dispatch('d2admin/page/openedLoad', undefined, { root: true })
      // 持久化数据加载侧边栏配置
      await dispatch('d2admin/menu/asideLoad', null, { root: true })
      // 加载全局尺寸
      await dispatch('d2admin/size/load', undefined, { root: true })
    }
  }
})
