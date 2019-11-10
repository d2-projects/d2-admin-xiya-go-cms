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
      const url = {
        prop: 'url',
        default: '/',
        label: '请求地址',
        rule: { required: true, message: '必填', trigger: 'change' },
        render: <el-input vModel={ this.form.model.url } clearable/>
      }
      const perms = {
        prop: 'perms',
        default: '',
        label: '权限标识',
        render: <el-input vModel={ this.form.model.perms } clearable/>
      }
      const icon = {
        prop: 'icon',
        default: '',
        label: '图标',
        render: <d2-icon-select vModel={ this.form.model.icon }/>
      }
      const visible = {
        prop: 'visible',
        default: 1,
        label: '可见性',
        rule: { required: true, message: '必填', trigger: 'change' },
        render: <d2-dict-radio name="visible" vModel={ this.form.model.visible } button/>
      }
      return [
        // 通用
        {
          prop: 'menu_name',
          default: '',
          label: '菜单名称',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <el-input vModel={ this.form.model.menu_name } clearable/>
        },
        {
          prop: 'parent_id',
          default: 0,
          label: '上级菜单',
          render: <d2-tree-popover vModel={ this.form.model.parent_id } source="MENU_ALL" key-label="menu_name"/>
        },
        {
          prop: 'menu_type',
          default: 1,
          label: '菜单类型',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <d2-dict-radio name="menu_type" vModel={ this.form.model.menu_type } on-change={ this.updateRules } button/>
        },
        {
          prop: 'order_num',
          default: 0,
          label: '显示排序',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <el-input-number min={ 1 } vModel={ this.form.model.order_num }/>
        },
        // 通用 end
        // 菜单类型 menu_type === 目录 1：[菜单图标] [是否外链?] [路由地址] [可见性]
        ...this.form.model.menu_type === 1 ? [ icon, url, visible ] : [],
        // 菜单类型 menu_type === 菜单 2：[菜单图标] [是否外链?] [路由地址] [组件路径?] [权限标识] [可见性]
        ...this.form.model.menu_type === 2 ? [ icon, url, perms, visible ] : [],
        // 菜单类型 menu_type === 按钮 3：[权限标识]
        ...this.form.model.menu_type === 3 ? [ perms ] : [],
        // 通用
        {
          prop: 'remark',
          default: '',
          label: '备注',
          render: <el-input vModel={ this.form.model.remark } clearable/>
        }
        // 通用 end
      ]
    }
  }
}
