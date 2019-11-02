import utils from '@/utils'
import table from '@/mixins/crud.table.js'
import formComponent from './form'

export default {
  mixins: [
    table
  ],
  components: {
    formComponent
  },
  render () {
    const filter = <d2-table-columns-filter { ...{ attrs: this.columnsFilter } } vModel={ this.table.columns }/>
    const page =
      <d2-container spacious>
        <template slot="header">
          <d2-search-panel vModel={ this.search.panel.active }>
            <d2-bar slot="title">
              <d2-bar-space/>
              <d2-bar-cell>
                { this.vNodePaginationMini }
              </d2-bar-cell>
              <d2-bar-space/>
              <d2-bar-cell>
                <el-button-group>
                  { this.vNodeButtonSearch }
                  <d2-button icon="el-icon-set-up" label="设置" on-click={ () => filter.componentInstance.start() }/>
                </el-button-group>
              </d2-bar-cell>
              <d2-bar-cell>
                { this.vNodeButtonCreate }
              </d2-bar-cell>
            </d2-bar>
            { this.vNodeSearchForm }
          </d2-search-panel>
        </template>
        <d2-table
          ref="table"
          { ...{ attrs: this.table } }
          loading={ this.isTableLoading }
          on-sort-change={ this.onTableSortChange }/>
        <d2-bar slot="footer">
          <d2-bar-cell>
            { this.vNodePaginationFull }
          </d2-bar-cell>
          <d2-bar-space/>
        </d2-bar>
        <form-component ref="formComponent" on-success={ this.research }/>
        { filter }
      </d2-container>
    return page
  },
  computed: {
    // 配置项
    // 表格列
    // [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [show]
    settingColumns () {
      return [
        { prop: 'user_name', label: '用户名', minWidth: '100px', fixed: 'left' },
        { prop: 'id', label: 'ID', minWidth: '100px', show: false },
        { prop: 'user_type', label: '用户类型', minWidth: '100px' },
        { prop: 'nickname', label: '昵称', minWidth: '100px' },
        { prop: 'sex', label: '性别', minWidth: '80px' },
        { prop: 'avatar', label: '头像', minWidth: '80px' },
        { prop: 'email', label: '邮箱', minWidth: '150px' },
        { prop: 'phone', label: '手机', minWidth: '100px' },
        { prop: 'phonenumber', label: '座机', minWidth: '100px', show: false },
        { prop: 'dept_id', label: '部门', width: '80px' },
        { prop: 'user_post', label: '岗位', width: '80px' },
        { prop: 'user_role', label: '角色', width: '80px' },
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
          label: '用户名',
          default: '',
          render: <el-input vModel={ this.search.form.model.user_name } style="width:80px;"/>
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
          render: <d2-dict-select vModel={ this.search.form.model.status } name="user_status" style="width:100px;" all/>
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
  },
  async created () {
    await this.loadDict()
    await this.research()
  },
  methods: {
    /**
     * @description (根据搜索条件)加载数据
     */
    async research () {
      await this.doLoadData(async () => {
        this.table.data = []
        const { list, page } = await this.$api.USER_ALL(this.searchData)
        this.paginationUpdate(page)
        this.table.data = list
      })
    },
    /**
     * @description 加载字典数据
     */
    async loadDict () {
      await this.doLoadDict(async () => {})
    },
    /**
     * @description 新建
     */
    create () {
      this.$refs.formComponent.create()
    },
    /**
     * @description 编辑
     * @param {object} id 编辑的行 id
     */
    edit (id) {
      this.$refs.formComponent.edit(id)
    },
    /**
     * @description 删除
     */
    delete (id) {
      this.$api.MENU_DELETE(id)
        .then(() => {
          this.$message({ message: '删除成功', type: 'success' })
          this.research()
        })
        .catch(() => {})
    }
  }
}
