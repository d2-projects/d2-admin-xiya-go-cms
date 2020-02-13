import utils from '@/utils'
import table from '@/mixins/crud-table.js'

export default {
  mixins: [ table ],
  components: {
    componentForm: () => import('./form')
  },
  render () {
    const page =
      <d2-container spacious>
        <d2-search-panel slot="header" vModel={ this.search.panel.active }>
          <d2-bar slot="title">
            <d2-bar-space/>
            { this.p('query') ? null : <d2-bar-cell>{ this.vNodeSearchPanelAlertNoPermissionQuery }</d2-bar-cell> }
            <d2-bar-space/>
            <d2-bar-cell>
              <el-button-group>
                { this.p('query') ? this.vNodeButtonSearch : null }
                { this.vNodeButtonTableColumnsFilterTrigger }
              </el-button-group>
            </d2-bar-cell>
            { this.p('add') ? <d2-bar-cell>{ this.vNodeButtonCreateWithParentId0 }</d2-bar-cell> : null }
          </d2-bar>
          { this.p('query') ? this.vNodeSearchForm : null }
        </d2-search-panel>
        { this.vNodeTable }
        <component-form ref="form" on-success={ this.research }/>
        { this.vNodeTableColumnsFilter }
      </d2-container>
    return page
  },
  data () {
    return {
      api: {
        index: 'DEPT_ALL',
        delete: 'DEPT_DELETE'
      },
      permission: {
        query: 'system:dept:query',
        add: 'system:dept:add',
        edit: 'system:dept:edit',
        remove: 'system:dept:remove'
      }
    }
  },
  computed: {
    // 配置项
    // 表格列
    // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
    settingColumns () {
      return [
        { prop: 'dept_name', label: '名称', minWidth: '200px', fixed: 'left' },
        { prop: 'email', label: '邮箱', minWidth: '200px', show: false },
        { prop: 'phone', label: '联系电话', minWidth: '200px', show: false },
        { prop: 'status', label: '状态', minWidth: '200px', show: false },
        { prop: 'parent_id', label: '上级部门', minWidth: '200px', show: false },
        { prop: 'order_num', label: '显示排序', minWidth: '200px', show: false },
        { prop: 'leader', label: '负责人', minWidth: '200px', show: false },
        { prop: 'create_by', label: '创建人员', width: '100px', show: false },
        { prop: 'created_at', label: '创建时间', formatter: row => utils.time.format(row.created_at, 'YYYY/M/D HH:mm:ss'), width: '140px', show: false },
        { prop: 'update_by', label: '更新人员', width: '100px', show: false },
        { prop: 'updated_at', label: '更新时间', formatter: row => utils.time.format(row.updated_at, 'YYYY/M/D HH:mm:ss'), width: '140px', show: false },
        { prop: 'remark', label: '备注', width: '200px', show: false }
      ]
    },
    // 配置项
    // 表格操作列配置
    settingActionsConfig () {
      return ({ row }) => [
        ...this.p('edit', [{ icon: 'el-icon-edit-outline', action: () => this.edit(row.id) }], []),
        ...this.p('create', [{ icon: 'el-icon-plus', type: 'primary', action: () => this.create({ parent_id: row.id }) }], []),
        ...this.p('remove', [{ icon: 'el-icon-delete', type: 'danger', confirm: `确定删除 [ ${row.dept_name} ] 吗`, action: () => this.delete(row.id) }], [])
      ]
    },
    // 配置项
    // 表格搜索条件
    // 建议的书写顺序 [prop] -> [label] -> [default] -> [render] -> [if][show]
    settingSearch () {
      return [
        {
          prop: 'dept_name',
          label: '名称',
          default: '',
          render: () => <el-input vModel={ this.search.form.model.dept_name } style="width:100px;" clearable/>
        },
        {
          prop: 'status',
          label: '状态',
          default: this.$env.VUE_APP_DICT_EMPTY_NUMBER,
          render: () => <d2-dict-radio vModel={ this.search.form.model.status } name="status" button all/>
        }
      ]
    }
  }
}
