import utils from '@/utils'
import formComponent from './form'

function settingColumns (h = () => {}) {
  return [
    { prop: 'user_name', label: '用户名', minWidth: '100px', fixed: 'left' },
    { prop: 'id', label: 'ID', minWidth: '100px', show: false },
    { prop: 'user_type', label: '用户类型', minWidth: '100px' },
    { prop: 'nickname', label: '昵称', minWidth: '100px' },
    { prop: 'sex', label: '性别', minWidth: '100px' },
    { prop: 'avatar', label: '头像', minWidth: '100px' },
    { prop: 'email', label: '邮箱', width: '200px' },
    { prop: 'phone', label: '手机', minWidth: '100px' },
    { prop: 'phonenumber', label: '座机', minWidth: '100px', show: false },
    { prop: 'dept_id', label: '部门', width: '100px' },
    { prop: 'user_post', label: '岗位', width: '100px' },
    { prop: 'user_role', label: '角色', width: '100px' },
    { prop: 'login_date', label: '上次登录时间', formatter: row => utils.time.format(row.login_date, 'YYYY/M/D HH:mm:ss'), width: '200px', show: false },
    { prop: 'login_ip', label: '上次登录地址', width: '100px', show: false },
    { prop: 'remark', label: '备注', width: '100px', show: false },
    { prop: 'status', label: '状态', width: '100px', show: false },
    { prop: 'create_by', label: '创建人员', width: '100px', show: false },
    { prop: 'created_at', label: '创建时间', formatter: row => utils.time.format(row.created_at, 'YYYY/M/D HH:mm:ss'), width: '200px', show: false },
    { prop: 'update_by', label: '更新人员', width: '100px', show: false },
    { prop: 'updated_at', label: '更新时间', formatter: row => utils.time.format(row.updated_at, 'YYYY/M/D HH:mm:ss'), width: '200px', show: false }
  ]
}

function settingActions (h = () => {}) {
  return [
    {
      label: '操作',
      align: 'center',
      width: '90px',
      fixed: 'right',
      render: ({ row }) => {
        const actions = [
          {
            icon: 'el-icon-edit-outline',
            action: () => this.onEdit(row.id)
          },
          {
            icon: 'el-icon-delete',
            type: 'danger',
            confirm: `确定删除 [ ${row.nickname} ] 吗`,
            action: () => this.onDelete(row.id)
          }
        ]
        return <d2-table-actions actions={ actions }/>
      }
    }
  ]
}

export default {
  components: {
    formComponent
  },
  render () {
    const filter = <d2-table-columns-filter { ...{ attrs: this.columnsFilter } } vModel={ this.table.columns }/>
    const page =
      <d2-container spacious>
        <d2-bar slot="header">
          <d2-bar-space/>
          <d2-bar-cell>
            <el-button-group>
              <d2-button icon="el-icon-refresh" on-click={ this.reload }/>
              <d2-button icon="el-icon-set-up" on-click={ () => filter.componentInstance.start() }/>
            </el-button-group>
          </d2-bar-cell>
          <d2-bar-cell>
            <d2-button type="primary" icon="el-icon-plus" label="新建" on-click={ this.onCreate }/>
          </d2-bar-cell>
        </d2-bar>
        <d2-table { ...{ attrs: this.table } } ref="table"/>
        <form-component ref="formComponent" on-success={ this.reload }/>
        { filter }
      </d2-container>
    return page
  },
  data () {
    const h = this.$createElement
    const columns = utils.fn.arrayAddUniqueId([
      ...settingColumns.call(this, h),
      ...settingActions.call(this, h)
    ])
    return {
      table: {
        loading: false,
        data: [],
        columns: columns.filter(e => e.show !== false)
      },
      columnsFilter: {
        options: columns
      }
    }
  },
  created () {
    this.reload()
  },
  methods: {
    /**
     * @description 加载所有数据
     * @description 字典
     * @description 表格
     */
    reload () {
      this.loadTableData()
    },
    /**
     * @description 加载表格数据
     * @description 需要加入 reload 方法中
     */
    async loadTableData () {
      this.table.loading = true
      this.table.data = []
      const { list, page } = await this.$api.USER_ALL()
      this.table.data = list
      this.table.loading = false
    },
    /**
     * @description 新建
     * @param {number} pid 新建项目的父级 id
     */
    onCreate (pid = 0) {
      this.$refs.formComponent.create(pid)
    },
    /**
     * @description 编辑
     * @param {object} id 编辑的行 id
     */
    onEdit (id) {
      this.$refs.formComponent.edit(id)
    },
    /**
     * @description 删除
     */
    onDelete (id) {
      this.$api.MENU_DELETE(id)
        .then(() => {
          this.$message({ message: '删除成功', type: 'success' })
          this.reload()
        })
        .catch(() => {})
    }
  }
}
