<template>
  <d2-container spacious>
    <template slot="header">
      <d2-bar>
        <d2-bar-cell>
          <el-breadcrumb>
            <el-breadcrumb-item v-for="breadcrumb of breadcrumbs" :key="breadcrumb.id">
              <el-button type="text" @click="onBreadcrumbClick(breadcrumb)">{{ breadcrumb.name }}</el-button>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </d2-bar-cell>
        <d2-bar-space/>
        <d2-bar-cell>
          <el-button type="primary" size="mini" @click="onCreate">新建</el-button>
        </d2-bar-cell>
      </d2-bar>
    </template>
    <d2-table v-bind="table"/>
    <form-component ref="formComponent" @success="refresh"/>
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
      breadcrumbs: [],
      table: {
        loading: false,
        data: [],
        columns: [
          {
            prop: 'menu_name',
            label: '名称',
            minWidth: '100px',
            fixed: 'left',
            render: ({ row }) =>
              <el-button type="text" on-click={ () => this.getList({ id: row.id, name: row.menu_name }) }>
                { row.menu_name }
              </el-button>
          },
          {
            prop: 'url',
            label: '地址',
            minWidth: '100px',
            render: ({ row }) => <el-tag>{ row.url }</el-tag>
          },
          {
            prop: 'icon',
            label: '图标',
            minWidth: '100px'
          },
          {
            prop: 'menu_type',
            label: '菜单类型',
            minWidth: '100px'
          },
          {
            prop: 'visible',
            label: '可见',
            minWidth: '100px'
          },
          {
            prop: 'created_at',
            label: '创建时间',
            minWidth: '100px',
            formatter: row => utils.time.format(row.created_at)
          },
          {
            prop: 'updated_at',
            label: '更新时间',
            minWidth: '100px',
            formatter: row => utils.time.format(row.updated_at)
          },
          {
            align: 'center',
            minWidth: '120px',
            fixed: 'right',
            render: ({ row }) =>
              <span>
                <el-button size="mini" icon="el-icon-edit-outline" on-click={ () => this.onEdit(row) }></el-button>
                <el-button size="mini" icon="el-icon-delete" type="danger" on-click={ () => this.onDelete(row) }></el-button>
              </span>
          }
        ]
      },
      cache: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /**
     * @description 请求列表数据
     */
    async getList (parent = defaultParent) {
      this.table.loading = true
      const result = await this.$api.MENU_FIND(parent.id)
      this.table.data = result
      if ((this.breadcrumbs[this.breadcrumbs.length - 1] || {}).id !== parent.id) this.breadcrumbs.push(parent)
      this.table.loading = false
    },
    /**
     * @description 刷新表格
     */
    refresh () {
      this.getList(this.breadcrumbs[this.breadcrumbs.length - 1])
    },
    /**
     * @description 面包屑项目被点击
     */
    onBreadcrumbClick (parent = defaultParent) {
      const breadcrumbIndex = this.breadcrumbs.findIndex(e => e.id === parent.id)
      this.breadcrumbs.splice(breadcrumbIndex + 1, this.breadcrumbs.length)
      this.getList(parent)
    },
    /**
     * @description 新建
     */
    onCreate () {
      this.$refs.formComponent.init({
        data: {
          parent_id: (this.breadcrumbs[this.breadcrumbs.length - 1] || {}).id || 0
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
    async onDelete (row) {
      await this.$api.MENU_DELETE(row.id)
      this.$message({ message: '删除成功', type: 'success' })
      this.refresh()
    }
  }
}
</script>
