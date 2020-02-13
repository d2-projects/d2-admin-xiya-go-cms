import utils from '@/utils'
import table from '@/mixins/crud-table.js'

export default {
  mixins: [ table ],
  components: {
    componentForm: () => import('./form'),
    componentForm2: () => import('./form2')
  },
  render () {
    const page =
      <d2-container spacious>
        <d2-search-panel slot="header" vModel={ this.search.panel.active }>
          <d2-bar slot="title">
            <d2-bar-space/>
            { this.p('query') ? <d2-bar-cell>{ this.vNodePaginationMini }</d2-bar-cell> : <d2-bar-cell>{ this.vNodeSearchPanelAlertNoPermissionQuery }</d2-bar-cell> }
            <d2-bar-space/>
            <d2-bar-cell>
              <el-button-group>
                { this.p('query') ? this.vNodeButtonSearch : null }
                { this.vNodeButtonTableColumnsFilterTrigger }
              </el-button-group>
            </d2-bar-cell>
            { this.p('add') ? <d2-bar-cell>{ this.vNodeButtonCreate }</d2-bar-cell> : null }
          </d2-bar>
          { this.p('query') ? this.vNodeSearchForm : null }
        </d2-search-panel>
        { this.vNodeTable }
        <d2-bar slot="footer">
          <d2-bar-cell>{ this.vNodePaginationFull }</d2-bar-cell>
          <d2-bar-space/>
        </d2-bar>
        <component-form ref="form" on-success={ this.onFormSuccess }/>
        <component-form-2 ref="form2" on-success={ this.onFormSuccess }/>
        { this.vNodeTableColumnsFilter }
      </d2-container>
    return page
  },
  data () {
    return {
      api: {
        index: 'ROLE_ALL',
        delete: 'ROLE_DELETE'
      },
      permission: {
        query: 'system:role:query',
        add: 'system:role:add',
        edit: 'system:role:edit',
        editData: 'system:role:editData',
        remove: 'system:role:remove'
      }
    }
  },
  computed: {
    // 配置项
    // 表格列
    // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
    settingColumns () {
      return [
        { prop: 'role_name', label: '角色名称', minWidth: '100px', fixed: 'left' },
        { prop: 'role_key', label: '权限字符', minWidth: '100px' },
        { prop: 'data_scope', label: '数据范围', minWidth: '100px', render: ({ row }) => <d2-dict value={ row.data_scope } name="data_scope"/> },
        { prop: 'role_sort', label: '显示顺序', minWidth: '100px', show: false },
        { prop: 'status', label: '状态', width: '100px', render: ({ row }) => <d2-dict name="status" value={ row.status }/>, show: false },
        { prop: 'remark', label: '备注', width: '100px', show: false },
        { prop: 'create_by', label: '创建人员', width: '100px', show: false },
        { prop: 'created_at', label: '创建时间', width: '200px', formatter: row => utils.time.format(row.created_at, 'YYYY/M/D HH:mm:ss'), show: false },
        { prop: 'update_by', label: '更新人员', width: '100px', show: false },
        { prop: 'updated_at', label: '更新时间', width: '200px', formatter: row => utils.time.format(row.updated_at, 'YYYY/M/D HH:mm:ss'), show: false }
      ].map(setting => {
        setting.sortable = 'custom'
        return setting
      })
    },
    // 配置项
    // 表格操作列配置
    settingActionsConfig () {
      return ({ row }) => [
        ...this.p('edit', [{ icon: 'el-icon-edit-outline', label: '修改', action: () => this.edit(row.id) }], []),
        ...this.p('editData', [{ icon: 'el-icon-edit-outline', label: '数据权限', action: () => this.edit(row.id, 'form2') }], []),
        ...this.p('remove', [{ icon: 'el-icon-delete', label: '删除', type: 'danger', confirm: `确定删除 [ ${row.role_name} ] 吗`, action: () => this.delete(row.id) }], [])
      ]
    },
    // 配置项
    // 表格搜索条件
    // 建议的书写顺序 [prop] -> [label] -> [default] -> [render] -> [if][show]
    settingSearch () {
      return [
        {
          prop: 'role_name',
          label: '角色名称',
          default: '',
          render: () => <el-input vModel={ this.search.form.model.role_name } style="width:100px;" clearable/>
        },
        {
          prop: 'role_key',
          label: '权限字符',
          default: '',
          render: () => <el-input vModel={ this.search.form.model.role_key } style="width:100px;" clearable/>
        },
        {
          prop: 'status',
          label: '状态',
          default: this.$env.VUE_APP_DICT_EMPTY_NUMBER,
          render: () => <d2-dict-radio vModel={ this.search.form.model.status } name="status" button all/>
        },
        {
          prop: 'start_time',
          label: '开始时间',
          default: '',
          render: () => <el-date-picker vModel={ this.search.form.model.start_time } value-format="yyyy-MM-dd" type="date" placeholder="开始时间" style="width:130px;"/>
        },
        {
          prop: 'end_time',
          label: '结束时间',
          default: '',
          render: () => <el-date-picker vModel={ this.search.form.model.end_time } value-format="yyyy-MM-dd" type="date" placeholder="结束时间" style="width:130px;"/>
        }
      ]
    }
  },
  methods: {
    onFormSuccess () {
      this.$store.dispatch('d2admin/permission/load', { focus: true })
      this.research()
    }
  }
}
