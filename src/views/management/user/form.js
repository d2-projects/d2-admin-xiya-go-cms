import form from '@/mixins/crud.form'

function setting (h = () => {}) {
  return [
    {
      prop: 'menu_name',
      label: '菜单名称',
      default: '',
      rule: { required: true, message: '请设置菜单名称', trigger: 'blur' },
      render: <el-input vModel={ this.form.model.menu_name }/>
    },
    {
      prop: 'parent_id',
      label: '上级菜单',
      default: 0,
      rule: { required: true, message: '请设置上级菜单', trigger: 'change' },
      render: <d2-tree-popover vModel={ this.form.model.parent_id } source="MENU_ALL"/>
    },
    {
      prop: 'order_num',
      label: '显示排序',
      default: 0,
      rule: { required: true, message: '请设置显示排序', trigger: 'blur' },
      render: <el-input-number min={ 1 } vModel={ this.form.model.order_num }/>
    },
    {
      prop: 'url',
      label: '请求地址',
      default: '/',
      rule: { required: true, message: '请设置请求地址', trigger: 'blur' },
      render: <el-input vModel={ this.form.model.url }/>
    },
    {
      prop: 'menu_type',
      label: '菜单类型',
      default: 1,
      rule: { required: true, message: '请设置请求地址', trigger: 'blur' },
      render: <d2-dict-select name="menu_type" vModel={ this.form.model.menu_type }/>
    },
    {
      prop: 'visible',
      label: '菜单状态',
      default: 1,
      rule: { required: true, message: '请设置菜单状态', trigger: 'blur' },
      render: <d2-dict-select name="visible" vModel={ this.form.model.visible }/>
    },
    {
      prop: 'perms',
      label: '权限标识',
      default: '',
      render: <el-input vModel={ this.form.model.perms }/>
    },
    {
      prop: 'icon',
      label: '图标',
      default: '',
      render: <d2-icon-select vModel={ this.form.model.icon }/>
    },
    {
      prop: 'remark',
      label: '备注',
      default: '',
      render: <el-input vModel={ this.form.model.remark }/>
    }
  ]
}

export default {
  mixins: [
    form({
      setting
    })
  ],
  methods: {
    /**
     * @description 初始化表单为编辑模式
     */
    async edit (id) {
      this.setMode('edit')
      this.open()
      try {
        this.form.model = await this.doLoadData(() => this.$api.MENU_DETAIL(id))
      } catch (error) {
        this.cancle()
      }
    },
    /**
     * @description 初始化表单为新建模式
     */
    async create (pid = 0) {
      this.setFormData({
        parent_id: pid
      })
      this.setMode('create')
      this.open()
    },
    /**
     * @description 提交表单
     */
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        const fn = this.switchByMode(
          () => this.$api.MENU_CREATE(this.form.model),
          () => this.$api.MENU_UPDATE(this.form.model)
        )
        try {
          await this.doSubmit(fn)
          this.$message({ message: '提交成功', type: 'success' })
          this.$emit('success')
          this.cancle()
        } catch (error) {}
      })
    }
  }
}
