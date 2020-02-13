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
        <component-form ref="form" on-success={ this.research }/>
        { this.vNodeTableColumnsFilter }
      </d2-container>
    return page
  },
  data () {
    return {
      api: {
        index: 'CONFIG_ALL',
        delete: 'CONFIG_DELETE'
      },
      permission: {
        query: 'system:config:query',
        add: 'system:config:add',
        edit: 'system:config:edit',
        remove: 'system:config:remove'
      }
    }
  },
  computed: {
    // 配置项
    // 表格列
    // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
    settingColumns () {
      return [
        { prop: 'config_name', label: '参数名称', minWidth: '100px', fixed: 'left' },
        { prop: 'config_key', label: '参数键名', minWidth: '100px' },
        { prop: 'config_value', label: '参数键值', minWidth: '100px' },
        { prop: 'config_type', label: '系统内置', minWidth: '100px', render: ({ row }) => <d2-dict value={ row.config_type } name="is"/> },
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
        ...this.p('edit', [{ icon: 'el-icon-edit-outline', action: () => this.edit(row.id) }], []),
        ...this.p('remove', [{ icon: 'el-icon-delete', type: 'danger', confirm: `确定删除 [ ${row.config_name} ] 吗`, action: () => this.delete(row.id) }], [])
      ]
    },
    // 配置项
    // 表格搜索条件
    // 建议的书写顺序 [prop] -> [label] -> [default] -> [render] -> [if][show]
    settingSearch () {
      return [
        {
          prop: 'config_name',
          label: '参数名称',
          default: '',
          render: () => <el-input vModel={ this.search.form.model.config_name } style="width:100px;" clearable/>
        },
        {
          prop: 'config_key',
          label: '参数键名',
          default: '',
          render: () => <el-input vModel={ this.search.form.model.config_key } style="width:100px;" clearable/>
        },
        {
          prop: 'config_value',
          label: '参数键值',
          default: '',
          render: () => <el-input vModel={ this.search.form.model.config_value } style="width:100px;" clearable/>
        },
        {
          prop: 'config_type',
          label: '系统内置',
          default: this.$env.VUE_APP_DICT_EMPTY_NUMBER,
          render: () => <d2-dict-radio vModel={ this.search.form.model.config_type } name="is" button all/>
        }
      ]
    }
  }
}
