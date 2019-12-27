import form from '@/mixins/crud-form'

export default {
  mixins: [ form ],
  data () {
    return {
      api: {
        detail: 'ROLE_DETAIL',
        create: 'ROLE_CREATE',
        update: 'ROLE_UPDATE'
      }
    }
  },
  computed: {
    setting () {
      return [
        {
          prop: 'role_name',
          default: '',
          label: '角色名称',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.role_name } clearable/>
        },
        {
          prop: 'role_key',
          default: '',
          label: '权限字符',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.role_key } clearable/>
        },
        {
          prop: 'role_sort',
          default: this.$env.VUE_APP_FORM_SORT_MIN,
          label: '显示顺序',
          render: () => <el-input-number min={ this.$env.VUE_APP_FORM_SORT_MIN } vModel={ this.form.model.role_sort }/>
        },
        {
          prop: 'role_menu',
          default: '',
          label: '菜单权限',
          render: () => <d2-tree vModel={ this.form.model.role_menu } source="MENU_ALL" key-label="menu_name" multiple half-mix stringify/>
        },
        {
          prop: 'status',
          default: this.$env.VUE_APP_DICT_STATUS_ACTIVE,
          label: '状态',
          render: () => <d2-dict-radio vModel={ this.form.model.status } name="status" button/>
        },
        {
          prop: 'remark',
          default: '',
          label: '备注',
          render: () => <el-input vModel={ this.form.model.remark } clearable/>
        }
      ]
    }
  }
}
