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
      const menuName = {
        prop: 'menu_name',
        default: '',
        label: '菜单名称',
        rule: { required: true, message: '必填', trigger: 'change' },
        render: () => <el-input vModel={ this.form.model.menu_name } clearable/>
      }
      const parentId = {
        prop: 'parent_id',
        default: 0,
        label: '上级菜单',
        render: () => <d2-tree-popover vModel={ this.form.model.parent_id } source="MENU_ALL" key-label="menu_name"/>
      }
      const menuType = {
        prop: 'menu_type',
        default: 1,
        label: '菜单类型',
        render: () => <d2-dict-radio name="menu_type" vModel={ this.form.model.menu_type } on-change={ this.onMenuTypeChange } button/>
      }
      const orderNum = {
        prop: 'order_num',
        default: 1,
        label: '显示排序',
        render: () => <el-input-number min={ 1 } vModel={ this.form.model.order_num }/>
      }
      const url = {
        prop: 'url',
        default: '/',
        label: '请求地址',
        render: () => <el-input vModel={ this.form.model.url } clearable/>
      }
      const component = {
        prop: 'component',
        default: '',
        label: '页面组件',
        render: () => <el-input vModel={ this.form.model.component } placeholder="utils.import('The path here')" clearable/>
      }
      const perms = {
        prop: 'perms',
        default: '',
        label: '权限标识',
        render: () => <el-input vModel={ this.form.model.perms } clearable/>
      }
      const icon = {
        prop: 'icon',
        default: '',
        label: '图标',
        render: () => <d2-icon-select vModel={ this.form.model.icon }/>
      }
      const visible = {
        prop: 'visible',
        default: 1,
        label: '可见性',
        render: () => <d2-dict-radio name="visible" vModel={ this.form.model.visible } button/>
      }
      const isFrame = {
        prop: 'is_frame',
        default: 1,
        label: '外链',
        render: () => <d2-dict-radio name="is_frame" vModel={ this.form.model.is_frame } button/>
      }
      const remark = {
        prop: 'remark',
        default: '',
        label: '备注',
        render: () => <el-input vModel={ this.form.model.remark } clearable/>
      }
      return [
        parentId,
        menuName,
        menuType,
        // 菜单类型 menu_type === 目录 1：[菜单图标] [是否外链] [路由地址] [可见性]
        ...this.form.model.menu_type === 1 ? [ icon, isFrame, url, visible ] : [],
        // 菜单类型 menu_type === 菜单 2：[菜单图标] [是否外链] [路由地址] [组件路径?] [权限标识] [可见性]
        ...this.form.model.menu_type === 2 ? [ icon, isFrame, url, component, perms, visible ] : [],
        // 菜单类型 menu_type === 按钮 3：[权限标识]
        ...this.form.model.menu_type === 3 ? [ perms ] : [],
        orderNum,
        remark
      ]
    }
  },
  methods: {
    onMenuTypeChange (menuType) {
      this.reloadModel({
        pick: [
          'menu_name',
          'parent_id',
          'menu_type',
          'order_num',
          'remark'
        ]
      })
    }
  }
}
