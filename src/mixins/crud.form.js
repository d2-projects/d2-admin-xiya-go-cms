import { cloneDeep } from 'lodash'

export default {
  render () {
    return <el-dialog
      { ...{ attrs: this.dialog } }
      title={ this.title }
      on-close={ this.cancle }>
      <el-form
        ref="form"
        { ...{ attrs: this.form } }
        rules={ this.rules }
        disabled={ this.isFormDisabled }
        v-loading={ this.isFormLoading }>
        {
          this.setting.map(
            item =>
              <el-form-item label={ item.label } prop={ item.prop }>
                { item.render }
              </el-form-item>
          )
        }
      </el-form>
      <el-form label-width={ this.form.labelWidth }>
        <el-form-item>
          <d2-button
            { ...{ attrs: this.buttons.cancle } }
            on-click={ this.cancle }/>
          <d2-button
            { ...{ attrs: this.buttons.submit } }
            loading={ this.isSubmitButtonLoading }
            disabled={ this.isSubmitButtonDisabled }
            on-click={ this.submit }/>
        </el-form-item>
      </el-form>
    </el-dialog>
  },
  data () {
    return {
      api: {
        detail: '',
        create: '',
        update: ''
      },
      cache: {
        form: {}
      },
      form: {
        model: {},
        labelWidth: '100px',
        statusIcon: true
      },
      rules: {},
      dialog: {
        visible: false,
        showClose: false,
        top: '0px',
        width: '400px',
        customClass: 'el-dialog__no-top-border',
        appendToBody: true
      },
      buttons: {
        cancle: {
          label: '取消',
          plain: true
        },
        submit: {
          label: '保存',
          type: 'primary',
          icon: 'el-icon-check'
        }
      },
      status: {
        isLoadingData: false,
        isLoadingDict: false,
        isSubmitting: false
      },
      mode: ''
    }
  },
  computed: {
    // 表单容器的标题
    title () {
      return this.switchByMode('新建', '编辑')
    },
    // 表单 loading 状态
    // 正在加载原始数据 || 正在加载字典
    isFormLoading () {
      return this.status.isLoadingData || this.status.isLoadingDict
    },
    // 表单 禁用 状态
    // 正在加载原始数据 || 正在加载字典 || 正在提交
    isFormDisabled () {
      return this.status.isLoadingData || this.status.isLoadingDict || this.status.isSubmitting
    },
    // 提交按钮 禁用 状态
    // 正在加载原始数据 || 正在加载字典
    isSubmitButtonDisabled () {
      return this.status.isLoadingData || this.status.isLoadingDict
    },
    // 提交按钮 loading 状态
    // 正在提交
    isSubmitButtonLoading () {
      return this.status.isSubmitting
    }
  },
  created () {
    this.init()
  },
  methods: {
    /**
     * @description 初始化表单为编辑模式
     */
    async edit (id) {
      this.setMode('edit')
      this.open()
      try {
        this.form.model = await this.doLoadData(() => (this.$api[this.api.detail] || function () { return Promise.resolve({}) })(id))
      } catch (error) {
        this.cancle()
      }
    },
    /**
     * @description 提交表单
     */
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        const fn = this.switchByMode(
          () => (this.$api[this.api.create] || Promise.resolve)(this.form.model),
          () => (this.$api[this.api.update] || Promise.resolve)(this.form.model)
        )
        try {
          await this.doSubmit(fn)
          this.$message({ message: '提交成功', type: 'success' })
          this.$emit('success')
          this.cancle()
        } catch (error) {}
      })
    },
    /**
     * @description 初始化 这一步将会根据 setting 设置 data 的默认值
     */
    init () {
      const form = this.getFormFromSetting()
      const rules = this.getRulesFromSetting()
      this.cache.form = cloneDeep(form)
      this.rules = cloneDeep(rules)
      this.form.model = cloneDeep(form)
    },
    /**
     * @description 初始化表单为新建模式
     */
    async create () {
      this.setFormData()
      this.setMode('create')
      this.open()
    },
    /**
     * @description 请求表单数据
     * @param {Function} fn 请求函数 需要返回 Promise
     */
    async doLoadData (fn) {
      this.status.isLoadingData = true
      try {
        const data = await fn()
        this.status.isLoadingData = false
        return Promise.resolve(data)
      } catch (error) {
        this.status.isLoadingData = false
        return Promise.reject(error)
      }
    },
    /**
     * @description 请求字典数据
     * @param {Function} fn 请求函数 需要返回 Promise
     */
    async doLoadDict (fn) {
      this.status.isLoadingDict = true
      try {
        const data = await fn()
        this.status.isLoadingDict = false
        return Promise.resolve(data)
      } catch (error) {
        this.status.isLoadingDict = false
        return Promise.reject(error)
      }
    },
    /**
     * @description 发送数据
     * @param {Function} fn 请求函数 需要返回 Promise
     */
    async doSubmit (fn) {
      this.status.isSubmitting = true
      try {
        const data = await fn()
        this.status.isSubmitting = false
        return Promise.resolve(data)
      } catch (error) {
        this.status.isSubmitting = false
        return Promise.reject(error)
      }
    },
    /**
     * 设置表单
     * @param {Object} config 覆盖默认值的数据
     */
    setFormData (config = {}) {
      this.form.model = Object.assign(cloneDeep(this.cache.form), config)
    },
    /**
     * 设置表单模式
     * @param {String} mode 模式名称 edit or create
     */
    setMode (mode) {
      this.mode = mode
    },
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
     * @description 打开面板
     */
    open () {
      this.dialog.visible = true
      this.$nextTick(() => this.clearValidate())
    },
    /**
     * @description 关闭面板
     */
    cancle () {
      this.clearValidate()
      this.dialog.visible = false
    },
    /**
     * @description 清空表单校验
     */
    clearValidate () {
      this.$refs.form && this.$refs.form.clearValidate()
    },
    /**
     * @description 从设置函数中提取表单默认值
     */
    getFormFromSetting () {
      let form = {}
      this.setting.forEach(item => {
        form[item.prop] = item.default
      })
      return form
    },
    /**
     * @description 从设置函数中提取表校验设置
     */
    getRulesFromSetting () {
      let rules = {}
      this.setting
        .filter(item => item.rule)
        .forEach(item => { rules[item.prop] = item.rule })
      return rules
    }
  }
}
