import { mapActions } from 'vuex'
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
        index: 'DICT_ALL',
        delete: 'DICT_DELETE'
      },
      permission: {
        query: 'system:dict:query',
        add: 'system:dict:add',
        edit: 'system:dict:edit',
        detail: 'system:dict:detail',
        remove: 'system:dict:remove'
      }
    }
  },
  computed: {
    // 配置项
    // 表格列
    // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
    settingColumns () {
      return [
        { prop: 'dict_name', label: '名称', minWidth: '100px', fixed: 'left', render: ({ row }) => <d2-button type="text" label={ row.dict_name } on-click={ () => { if (this.p('detail')) { this.goDictData(row.id) } } }/> },
        { prop: 'dict_type', label: '标识', minWidth: '100px', render: ({ row }) => <d2-button type="text" label={ row.dict_type } on-click={ () => { if (this.p('detail')) { this.goDictData(row.id) } } }/> },
        { prop: 'dict_value_type', label: '标识', minWidth: '100px', render: ({ row }) => <d2-dict name="dict_value_type" value={ row.dict_value_type }/> },
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
        ...this.p('edit', [{ icon: 'el-icon-edit-outline', action: () => this.edit(row.id) }], []),
        ...this.p('detail', [{ icon: 'el-icon-collection', action: () => this.goDictData(row.id) }], []),
        ...this.p('remove', [{ icon: 'el-icon-delete', type: 'danger', confirm: `确定删除 [ ${row.dict_name} ] 吗`, action: () => this.delete(row.id) }], [])
      ]
    },
    // 配置项
    // 表格搜索条件
    // 建议的书写顺序 [prop] -> [label] -> [default] -> [render] -> [if][show]
    settingSearch () {
      return [
        {
          prop: 'dict_name',
          label: '名称',
          default: '',
          render: () => <el-input vModel={ this.search.form.model.dict_name } style="width:100px;" clearable/>
        },
        {
          prop: 'dict_type',
          label: '标识',
          default: '',
          render: () => <el-input vModel={ this.search.form.model.dict_type } style="width:100px;" clearable/>
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
        },
        {
          prop: 'status',
          label: '状态',
          default: this.$env.VUE_APP_DICT_EMPTY_NUMBER,
          render: () => <d2-dict-radio vModel={ this.search.form.model.status } name="status" button all/>
        }
      ]
    }
  },
  methods: {
    ...mapActions('d2admin/page', [
      'closeBy'
    ]),
    goDictData (id) {
      this.closeBy(page => page.name === 'management-dict-data')
      this.$router.push({
        name: 'management-dict-data',
        query: {
          dict_id: id
        }
      })
    }
  }
}
