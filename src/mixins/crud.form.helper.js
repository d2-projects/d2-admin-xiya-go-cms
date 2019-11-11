export default {
  methods: {
    /**
     * @description 根据不同的模式 返回不同的值
     * @param {*} createModeValve 新增模式返回值
     * @param {*} editModeValue 编辑模式返回值
     * @param {*} defaultValue 没有匹配的模式返回值 默认为 createModeValve
     */
    switchByMode (createModeValve = '', editModeValue = '', defaultValue = createModeValve) {
      if (this.mode === 'create') {
        return createModeValve
      } else if (this.mode === 'edit') {
        return editModeValue
      } else {
        return defaultValue
      }
    },
    /**
     * @description 设置表单模式
     * @param {String} mode 模式名称 edit or create
     */
    setMode (mode) { this.mode = mode }
  }
}
