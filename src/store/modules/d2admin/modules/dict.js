export default context => ({
  namespaced: true,
  state: {
    dicts: []
  },
  actions: {
    /**
     * @description 获取字典
     * @param {Object} vuex context
     * @param {String} name 字典名称
     */
    get ({ state }, name) {
      const dict = state.dicts.find(e => e.name === name)
      return (dict && dict.value) || []
    },
    /**
     * @description 设置字典
     * @param {Object} vuex context
     * @param {Object} payload {String} name 字典名称
     * @param {Object} payload {Array} value 字典数据
     */
    set ({ state }, { name = '', value = [] } = {}) {
      const dictIndex = state.dicts.findIndex(e => e.name === name)
      if (dictIndex < 0) {
        state.dicts.push({ name, value })
      } else {
        state.dicts.splice(dictIndex, 1, { name, value })
      }
    }
  }
})
