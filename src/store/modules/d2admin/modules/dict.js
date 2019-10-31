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
        name: 'user_status',
        value: [
          { label: '正常', value: 1 },
          { label: '停用', value: 2 }
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
    }
  }
})
