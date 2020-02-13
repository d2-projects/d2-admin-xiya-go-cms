import utils from '@/utils'
import table from '@/mixins/crud-table.js'
import './style.scss'

export default {
  mixins: [ table ],
  components: {
    componentForm: () => import('./form')
  },
  render () {
    const page =
      <d2-container spacious class="page-management-user">
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
        <el-container class="container">
          <el-aside v-permission={ 'system:dept:query' } width="240px">
            <d2-tree vModel={ this.search.form.model.dept_id } source="DEPT_ALL" key-label="dept_name" expand-on-click-node={ false } default-expand-all on-change={ this.research }/>
          </el-aside>
          <el-main>{ this.vNodeTable }</el-main>
        </el-container>
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
      },
      permission: {
        query: 'system:user:query',
        add: 'system:user:add',
        edit: 'system:user:edit',
        remove: 'system:user:remove'
      }
    }
  },
  computed: {
    // 配置项
    // 表格列
    // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
    settingColumns () {
      return [
        { prop: 'user_name', label: '登录账号', minWidth: '100px', fixed: 'left' },
        { prop: 'nickname', label: '昵称', minWidth: '100px' },
        { prop: 'id', label: 'ID', minWidth: '80px' },
        { prop: 'sex', label: '性别', minWidth: '80px', render: ({ row }) => <d2-dict name="sex" value={ row.sex } all all-label="未知"/> },
        {
          prop: 'avatar',
          label: '头像',
          minWidth: '80px',
          render: ({ row }) =>
            <el-image src={ row.avatar } fit="cover" preview-src-list={ [ row.avatar ] } style="height: 28px; width: 28px; border-radius: 2px;" lazy>
              <div slot="error" style="height: 100%; width: 100%;" flex="main:center cross:center">
                <i class="el-icon-picture-outline"/>
              </div>
            </el-image>
        },
        { prop: 'email', label: '邮箱', minWidth: '160px' },
        { prop: 'phone', label: '手机', minWidth: '100px' },
        { prop: 'phonenumber', label: '座机', minWidth: '100px' },
        { prop: 'dept_id', label: '归属部门', width: '100px', render: ({ row }) => <d2-dict name="dept_id" value={ row.dept_id } custom/>, if: this.$permission('system:dept:query') },
        { prop: 'login_date', label: '上次登录时间', width: '160px', formatter: row => utils.time.format(row.login_date, 'YYYY/M/D HH:mm:ss') },
        { prop: 'login_ip', label: '上次登录地址', width: '120px' },
        { prop: 'remark', label: '备注', width: '100px' },
        { prop: 'status', label: '状态', width: '100px', render: ({ row }) => <d2-dict name="status" value={ row.status }/> },
        { prop: 'create_by', label: '创建人员', width: '100px', show: false },
        { prop: 'created_at', label: '创建时间', width: '160px', formatter: row => utils.time.format(row.created_at, 'YYYY/M/D HH:mm:ss') },
        { prop: 'update_by', label: '更新人员', width: '100px', show: false },
        { prop: 'updated_at', label: '更新时间', width: '160px', formatter: row => utils.time.format(row.updated_at, 'YYYY/M/D HH:mm:ss') }
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
        ...this.p('remove', [{ icon: 'el-icon-delete', type: 'danger', confirm: `确定删除 [ ${row.user_name} ] 吗`, action: () => this.delete(row.id) }], [])
      ]
    },
    // 配置项
    // 表格搜索条件
    // 建议的书写顺序 [prop] -> [label] -> [default] -> [render] -> [if][show]
    settingSearch () {
      return [
        {
          prop: 'user_name',
          label: '登录账号',
          default: '',
          render: () => <el-input vModel={ this.search.form.model.user_name } style="width:100px;" clearable/>
        },
        {
          prop: 'phone',
          label: '手机',
          default: '',
          render: () => <el-input vModel={ this.search.form.model.phone } style="width:100px;" clearable/>
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
        },
        {
          prop: 'dept_id',
          label: '部门',
          default: 0,
          show: false
        }
      ]
    }
  },
  methods: {
    /**
     * @description 加载需要的字典数据
     */
    loadDict () {
      // 归属部门
      if (this.$permission('system:dept:query')) {
        this.loadDictOne({
          name: 'dept_id',
          method: async () => utils.helper.flatTreeToArray({ data: await this.$api.DEPT_ALL() }),
          label: 'dept_name'
        })
      }
    }
  }
}
