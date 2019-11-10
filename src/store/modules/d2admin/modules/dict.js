export default context => ({
  namespaced: true,
  state: {
    dicts: [
      {
        name: 'menu_type',
        value: [
          { label: '目录', value: 1 },
          { label: '菜单', value: 2 },
          { label: '按钮', value: 3 }
        ]
      },
      {
        name: 'visible',
        value: [
          { label: '显示', value: 1 },
          { label: '隐藏', value: 2 }
        ]
      },
      {
        name: 'status',
        value: [
          { label: '正常', value: 1 },
          { label: '停用', value: 2 }
        ]
      },
      {
        name: 'sex',
        value: [
          { label: '男', value: 1 },
          { label: '女', value: 2 }
        ]
      },
      {
        name: 'data_scope',
        value: [
          { label: '全部数据权限', value: 1 },
          { label: '自定义数据权限', value: 2 }
        ]
      }
    ]
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
      console.log('set')
      const dictIndex = state.dicts.findIndex(e => e.name === name)
      if (dictIndex < 0) {
        state.dicts.push({ name, value })
      } else {
        state.dicts.splice(dictIndex, 1, { name, value })
      }
    }
  }
})
