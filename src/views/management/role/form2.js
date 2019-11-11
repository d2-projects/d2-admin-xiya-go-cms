import form from '@/mixins/crud.form'

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
          render: () => <el-input vModel={ this.form.model.role_name } clearable disabled/>
        },
        {
          prop: 'role_key',
          default: '',
          label: '权限字符',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.role_key } clearable disabled/>
        },
        {
          prop: 'data_scope',
          default: '',
          label: '数据范围',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <d2-dict-select vModel={ this.form.model.data_scope } name="data_scope"/>
        },
        ...this.form.model.data_scope === 2 ? [
          {
            prop: 'role_dept',
            default: '',
            label: '部门权限',
            render: () => <d2-tree vModel={ this.form.model.role_dept } source="DEPT_ALL" key-label="dept_name" multiple stringify/>
          }
        ] : []
      ]
    }
  }
}
