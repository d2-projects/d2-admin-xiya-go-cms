import utils from '@/utils'
import formComponent from './form'

function settingColumns (h = () => {}) {
  return [
    { prop: 'menu_name', label: '名称', minWidth: '200px', fixed: 'left' },
    { prop: 'icon', label: '图标', render: ({ row }) => row.icon ? <d2-icon name={ row.icon }></d2-icon> : <span>无</span>, width: '50px' },
    { prop: 'url', label: '地址', minWidth: '200px' },
    { prop: 'perms', label: '权限标识', width: '200px' },
    { prop: 'id', label: 'ID', width: '50px', show: false },
    { prop: 'menu_type', label: '类型', render: ({ row }) => <d2-dict name="menu_type" value={ row.menu_type }/>, width: '50px' },
    { prop: 'visible', label: '可见', render: ({ row }) => <d2-dict name="visible" value={ row.visible }/>, width: '50px' },
    { prop: 'created_by', label: '创建人员', width: '100px', show: false },
    { prop: 'created_at', label: '创建时间', formatter: row => utils.time.format(row.created_at, 'YYYY/M/D HH:mm:ss'), width: '140px', show: false },
    { prop: 'updated_by', label: '更新人员', width: '100px', show: false },
    { prop: 'updated_at', label: '更新时间', formatter: row => utils.time.format(row.updated_at, 'YYYY/M/D HH:mm:ss'), width: '140px', show: false },
    { prop: 'remark', label: '备注', width: '200px', show: false }
  ]
}

function settingActions (h = () => {}) {
  return [
    {
      label: '操作',
      align: 'center',
      width: '120px',
      fixed: 'right',
      render: ({ row }) => {
        const actions = [
          {
            icon: 'el-icon-edit-outline',
            action: () => this.onEdit(row.id)
          },
          {
            icon: 'el-icon-plus',
            type: 'primary',
            action: () => this.onCreate(row.id)
          },
          {
            icon: 'el-icon-delete',
            type: 'danger',
            confirm: `确定删除 [ ${row.menu_name} ] 吗`,
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
      this.table.data = await this.$api.MENU_ALL()
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
