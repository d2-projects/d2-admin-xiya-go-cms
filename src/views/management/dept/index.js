import utils from '@/utils'
import table from '@/mixins/crud.table.js'
import componentForm from './form'

export default {
  mixins: [ table ],
  components: { componentForm },
  render () {
    const page =
      <d2-container spacious>
        <d2-search-panel slot="header" vModel={ this.search.panel.active }>
          <d2-bar slot="title">
            <d2-bar-space/>
            <d2-bar-cell>
              <el-button-group>
                { this.vNodeButtonSearch }
                { this.vNodeButtonTableColumnsFilterTrigger }
              </el-button-group>
            </d2-bar-cell>
            <d2-bar-cell>{ this.vNodeButtonCreateWithParentId0 }</d2-bar-cell>
          </d2-bar>
          { this.vNodeSearchForm }
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
      }
    }
  },
  computed: {
    // 配置项
    // 表格列
    // [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
    settingColumns () {
      return [
        { prop: 'dept_name', label: '名称', minWidth: '200px', fixed: 'left' },
        { prop: 'email', label: '邮箱', minWidth: '200px' },
        { prop: 'phone', label: '联系电话', minWidth: '200px' },
        { prop: 'status', label: '状态', minWidth: '200px' },
        { prop: 'parent_id', label: '上级部门', minWidth: '200px' },
        { prop: 'order_num', label: '显示排序', minWidth: '200px' },
        { prop: 'leader', label: '负责人', minWidth: '200px' },
        { prop: 'created_by', label: '创建人员', width: '100px', show: false },
        { prop: 'created_at', label: '创建时间', formatter: row => utils.time.format(row.created_at, 'YYYY/M/D HH:mm:ss'), width: '140px', show: false },
        { prop: 'updated_by', label: '更新人员', width: '100px', show: false },
        { prop: 'updated_at', label: '更新时间', formatter: row => utils.time.format(row.updated_at, 'YYYY/M/D HH:mm:ss'), width: '140px', show: false },
        { prop: 'remark', label: '备注', width: '200px', show: false }
      ]
    },
    // 配置项
    // 表格操作列
    // [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
    settingActions () {
      return [
        {
          label: '操作',
          align: 'center',
          width: '120px',
          fixed: 'right',
          render: ({ row }) => {
            const actions = [
              { icon: 'el-icon-edit-outline', action: () => this.edit(row.id) },
              { icon: 'el-icon-plus', type: 'primary', action: () => this.create({ parent_id: row.id }) },
              { icon: 'el-icon-delete', type: 'danger', confirm: `确定删除 [ ${row.dept_name} ] 吗`, action: () => this.delete(row.id) }
            ]
            return <d2-table-actions actions={ actions }/>
          }
        }
      ]
    },
    // 配置项
    // 搜索
    // [prop] -> [label] -> [default] -> [render] -> [if][show]
    settingSearch () {
      return [
        {
          prop: 'dept_name',
          label: '名称',
          default: '',
          render: <el-input vModel={ this.search.form.model.dept_name } style="width:100px;" clearable/>
        },
        {
          prop: 'status',
          label: '状态',
          default: 0,
          render: <d2-dict-radio vModel={ this.search.form.model.status } name="status" button all/>
        }
      ]
    }
  }
}
