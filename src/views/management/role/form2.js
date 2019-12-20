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
          prop: 'data_scope',
          default: '',
          label: '数据范围',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <d2-dict-select vModel={ this.form.model.data_scope } name="data_scope" on-change={ this.onMenuTypeChange }/>
        },
        // data_scope
        // 1 全部
        // 2 自定义
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
  },
  methods: {
    onMenuTypeChange (menuType) {
      this.modelReload({
        pick: [
          'role_name',
          'role_key',
          'data_scope'
        ],
        data: {
          // 全部数据权限时 清空部门权限
          ...menuType === 1 ? { role_dept: '' } : {}
        }
      })
    }
  }
}
