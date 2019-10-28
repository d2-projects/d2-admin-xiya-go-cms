import formMixin from '@/mixins/form'

function setting (h = () => {}) {
  return [
    {
      prop: 'menu_name',
      default: '',
      label: '菜单名称',
      rule: { required: true, message: '请设置菜单名称', trigger: 'blur' },
      render: <el-input vModel={ this.form.model.menu_name }/>
    },
    {
      prop: 'parent_id',
      default: 0,
      label: '上级菜单',
      rule: { required: true, message: '请设置上级菜单', trigger: 'change' },
      render:
        <d2-tree-popover
          vModel={ this.form.model.parent_id }
          source="MENU_ALL"
          tree={
            {
              defaultExpandAll: true,
              nodeKey: 'id',
              props: {
                label: 'menu_name',
                children: 'children_list'
              }
            }
          }/>
    },
    {
      prop: 'order_num',
      default: 0,
      label: '显示排序',
      rule: { required: true, message: '请设置显示排序', trigger: 'blur' },
      render: <el-input-number min={ 1 } vModel={ this.form.model.order_num }/>
    },
    {
      prop: 'url',
      default: '/',
      label: '请求地址',
      rule: { required: true, message: '请设置请求地址', trigger: 'blur' },
      render: <el-input vModel={ this.form.model.url }/>
    },
    {
      prop: 'menu_type',
      default: 1,
      label: '菜单类型',
      rule: { required: true, message: '请设置请求地址', trigger: 'blur' },
      render: <d2-dict-select name="menu_type" vModel={ this.form.model.menu_type }/>
    },
    {
      prop: 'visible',
      default: 1,
      label: '菜单状态',
      rule: { required: true, message: '请设置菜单状态', trigger: 'blur' },
      render: <d2-dict-select name="visible" vModel={ this.form.model.visible }/>
    },
    {
      prop: 'perms',
      default: '',
      label: '权限标识',
      render: <el-input vModel={ this.form.model.perms }/>
    },
    {
      prop: 'icon',
      default: '',
      label: '图标',
      render: <d2-icon-select vModel={ this.form.model.icon }/>
    },
    {
      prop: 'remark',
      default: '',
      label: '备注',
      render: <el-input vModel={ this.form.model.remark }/>
    }
  ]
}

export default {
  mixins: [
    formMixin({
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
