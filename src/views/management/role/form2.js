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
          prop: 'data_scope',
          default: this.$env.VUE_APP_DICT_EMPTY_NUMBER,
          label: '数据范围',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <d2-dict-select vModel={ this.form.model.data_scope } name="data_scope" on-change={ this.onDataScopeChange }/>
        },
        ...this.form.model.data_scope === this.$env.VUE_APP_DICT_DATA_SCOPE_CUSTOM ? [
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
    onDataScopeChange (dataScope) {
      this.modelReload({
        pick: [
          'role_name',
          'role_key',
          'data_scope'
        ],
        // 全部数据权限时 清空部门权限
        data: dataScope === this.$env.VUE_APP_DICT_DATA_SCOPE_ALL ? { role_dept: '' } : {}
      })
    }
  }
}
