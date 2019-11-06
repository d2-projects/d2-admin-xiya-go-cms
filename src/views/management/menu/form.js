import form from '@/mixins/crud.form'

export default {
  mixins: [ form ],
  data () {
    return {
      api: {
        detail: 'MENU_DETAIL',
        create: 'MENU_CREATE',
        update: 'MENU_UPDATE'
      }
    }
  },
  computed: {
    setting () {
      return [
        {
          prop: 'menu_name',
          default: '',
          label: '菜单名称',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <el-input vModel={ this.form.model.menu_name }/>
        },
        {
          prop: 'parent_id',
          default: 0,
          label: '上级菜单',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <d2-tree-popover vModel={ this.form.model.parent_id } source="MENU_ALL" key-label="menu_name"/>
        },
        {
          prop: 'order_num',
          default: 0,
          label: '显示排序',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <el-input-number min={ 1 } vModel={ this.form.model.order_num }/>
        },
        {
          prop: 'url',
          default: '/',
          label: '请求地址',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <el-input vModel={ this.form.model.url }/>
        },
        {
          prop: 'menu_type',
          default: 1,
          label: '菜单类型',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <d2-dict-select name="menu_type" vModel={ this.form.model.menu_type }/>
        },
        {
          prop: 'visible',
          default: 1,
          label: '菜单状态',
          rule: { required: true, message: '必填', trigger: 'change' },
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
  },
  methods: {
    /**
     * @description 初始化表单为新建模式
     * @description 树形结构表格 重新定义新建方法
     */
    async create (pid = 0) {
      this.setFormData({
        parent_id: pid
      })
      this.setMode('create')
      this.open()
    }
  }
}
