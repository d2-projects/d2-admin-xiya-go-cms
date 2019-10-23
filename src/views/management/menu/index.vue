<template>
  <d2-container spacious>
    <template slot="header">
      <d2-bar>
        <d2-bar-space/>
        <d2-bar-cell>
          <el-button type="primary" icon="el-icon-plus" @click="onCreate">新建菜单</el-button>
        </d2-bar-cell>
      </d2-bar>
    </template>
    <d2-table v-bind="table"/>
    <form-component ref="formComponent" @success="loadTableData"/>
  </d2-container>
</template>

<script>
import utils from '@/utils'
import formComponent from './form'

const defaultParent = {
  id: 0,
  name: '系统'
}
export default {
  components: {
    formComponent
  },
  data () {
    return {
      table: {
        loading: false,
        data: [],
        columns: [
          {
            prop: 'menu_name',
            label: '名称',
            minWidth: '250px',
            fixed: 'left',
            render: ({ row }) =>
              <el-button type="text" on-click={ () => this.loadTableData({ id: row.id, name: row.menu_name }) }>
                { row.menu_name }
              </el-button>
          },
          {
            prop: 'url',
            label: '地址',
            minWidth: '200px',
            render: ({ row }) => <el-tag>{ row.url }</el-tag>
          },
          {
            prop: 'icon',
            label: '图标',
            width: '50px',
            render: ({ row }) => row.icon ? <d2-icon name={ row.icon }></d2-icon> : <span>无</span>
          },
          {
            prop: 'menu_type',
            label: '类型',
            width: '50px',
            render: ({ row }) => <d2-dict name="menu_type" value={ row.menu_type }></d2-dict>
          },
          {
            prop: 'visible',
            label: '可见',
            width: '50px',
            render: ({ row }) => <d2-dict name="visible" value={ row.visible }></d2-dict>
          },
          {
            prop: 'created_at',
            label: '创建时间',
            width: '140px',
            formatter: row => utils.time.format(row.created_at, 'YYYY/M/D HH:mm:ss')
          },
          {
            prop: 'updated_at',
            label: '更新时间',
            width: '140px',
            formatter: row => utils.time.format(row.updated_at, 'YYYY/M/D HH:mm:ss')
          },
          {
            align: 'center',
            width: '120px',
            fixed: 'right',
            render: ({ row }) =>
              <d2-table-actions actions={
                [
                  {
                    icon: 'el-icon-edit-outline',
                    action: () => this.onEdit(row)
                  },
                  {
                    icon: 'el-icon-plus',
                    type: 'primary',
                    action: () => this.onCreate({ pid: row.id })
                  },
                  {
                    icon: 'el-icon-delete',
                    type: 'danger',
                    confirm: `确定删除 [ ${ row.menu_name } ] 吗`,
                    action: () => this.onDelete(row)
                  }
                ]
              }/>
          }
        ]
      },
      cache: []
    }
  },
  created () {
    this.loadTableData()
  },
  methods: {
    /**
     * @description 请求列表数据
     */
    async loadTableData () {
      this.table.loading = true
      this.table.data = await this.$api.MENU_ALL()
      this.table.loading = false
    },
    /**
     * @description 新建
     */
    onCreate ({ pid = 0 } = {}) {
      this.$refs.formComponent.init({
        data: {
          parent_id: pid
        },
        mode: 'create'
      })
    },
    /**
     * @description 表格操作 编辑
     */
    onEdit (row) {
      this.$refs.formComponent.init({ data: row, mode: 'edit' })
    },
    /**
     * @description 表格操作 删除
     */
    onDelete (row) {
      this.$api.MENU_DELETE(row.id)
        .then(() => {
          this.$message({ message: '删除成功', type: 'success' })
          this.loadTableData()
        })
        .catch(() => {})
    }
  }
}
</script>
