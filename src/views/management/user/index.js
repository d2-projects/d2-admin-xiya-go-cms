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
            <d2-bar-cell>{ this.vNodePaginationMini }</d2-bar-cell>
            <d2-bar-space/>
            <d2-bar-cell>
              <el-button-group>
                { this.vNodeButtonSearch }
                { this.vNodeButtonTableColumnsFilterTrigger }
              </el-button-group>
            </d2-bar-cell>
            <d2-bar-cell>{ this.vNodeButtonCreate }</d2-bar-cell>
          </d2-bar>
          { this.vNodeSearchForm }
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
        index: 'USER_ALL',
        delete: 'USER_DELETE'
      }
    }
  },
  computed: {
    // 配置项
    // 表格列
    // [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [show]
    settingColumns () {
      return [
        { prop: 'user_name', label: '登录账号', minWidth: '100px', fixed: 'left' },
        { prop: 'nickname', label: '昵称', minWidth: '100px' },
        { prop: 'id', label: 'ID', minWidth: '100px', show: false },
        { prop: 'sex', label: '性别', minWidth: '100px' },
        { prop: 'avatar', label: '头像', minWidth: '100px' },
        { prop: 'email', label: '邮箱', minWidth: '150px' },
        { prop: 'phone', label: '手机', minWidth: '100px' },
        { prop: 'phonenumber', label: '座机', minWidth: '100px', show: false },
        { prop: 'dept_id', label: '归属部门', width: '100px' },
        { prop: 'user_post', label: '岗位', width: '100px' },
        { prop: 'user_role', label: '角色', width: '100px' },
        { prop: 'login_date', label: '上次登录时间', width: '200px', formatter: row => utils.time.format(row.login_date, 'YYYY/M/D HH:mm:ss'), show: false },
        { prop: 'login_ip', label: '上次登录地址', width: '100px', show: false },
        { prop: 'remark', label: '备注', width: '100px', show: false },
        { prop: 'status', label: '状态', width: '100px', show: false },
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
    // 表格操作列
    // [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [show]
    settingActions () {
      return [
        {
          label: '操作',
          align: 'center',
          width: '90px',
          fixed: 'right',
          render: ({ row }) => {
            const actions = [
              { icon: 'el-icon-edit-outline', action: () => this.edit(row.id) },
              { icon: 'el-icon-delete', type: 'danger', confirm: `确定删除 [ ${row.user_name} ] 吗`, action: () => this.delete(row.id) }
            ]
            return <d2-table-actions actions={ actions }/>
          }
        }
      ]
    },
    // 配置项
    // 搜索
    // [prop] -> [label] -> [default] -> [render]
    settingSearch () {
      return [
        {
          prop: 'user_name',
          label: '登录账号',
          default: '',
          render: <el-input vModel={ this.search.form.model.user_name } style="width:100px;"/>
        },
        {
          prop: 'phone',
          label: '手机',
          default: '',
          render: <el-input vModel={ this.search.form.model.phone } style="width:100px;"/>
        },
        {
          prop: 'status',
          label: '状态',
          default: 0,
          render: <d2-dict-select vModel={ this.search.form.model.status } name="status" style="width:100px;" all/>
        },
        {
          prop: 'start_time',
          label: '开始时间',
          default: '',
          render: <el-date-picker vModel={ this.search.form.model.start_time } value-format="yyyy-MM-dd" type="date" placeholder="开始时间" style="width:130px;"/>
        },
        {
          prop: 'end_time',
          label: '结束时间',
          default: '',
          render: <el-date-picker vModel={ this.search.form.model.end_time } value-format="yyyy-MM-dd" type="date" placeholder="结束时间" style="width:130px;"/>
        }
      ]
    }
  }
}
