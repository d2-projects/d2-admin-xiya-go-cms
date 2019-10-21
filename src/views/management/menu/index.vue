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
          <el-button type="primary" size="mini">新建</el-button>
        </d2-bar-cell>
      </d2-bar>
    </template>
    <d2-table v-bind="table"/>
  </d2-container>
</template>

<script>
import utils from '@/utils'
const defaultParent = {
  id: 0,
  name: '系统'
}
export default {
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
              <el-button
                type="text"
                vOn:click={
                  () => this.getList({
                    id: row.id,
                    name: row.menu_name
                  })
                }>
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
            align: 'right',
            minWidth: '200px',
            fixed: 'right',
            render: ({ row }) =>
              <span>
                <el-button size="mini" vOn:click={ () => this.onTableActionEdit(row) }>
                  <d2-icon name="pencil"></d2-icon>
                </el-button>
                <el-button size="mini" type="danger" vOn:click={ () => this.onTableActionDelete(row) }>
                  <d2-icon name="trash-o"></d2-icon>
                </el-button>
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
     * 请求列表数据
     */
    async getList (parent = defaultParent) {
      // 设置加载状态
      this.table.loading = true
      // 请求接口
      const result = await this.$api.MENU_FIND({
        parent: parent.id
      })
      // 更新表格数据
      this.table.data = result
      // 更新面包屑
      if ((this.breadcrumbs[this.breadcrumbs.length - 1] || {}).id !== parent.id) {
        this.breadcrumbs.push(parent)
      }
      // 结束加载状态
      this.table.loading = false
    },
    /**
     * 面包屑项目被点击
     */
    onBreadcrumbClick (parent = defaultParent) {
      const breadcrumbIndex = this.breadcrumbs.findIndex(e => e.id === parent.id)
      this.breadcrumbs.splice(breadcrumbIndex + 1, this.breadcrumbs.length)
      this.getList(parent)
    },
    /**
     * 表格操作 编辑
     */
    onTableActionEdit (row) {
      console.group('onTableActionEdit')
      console.log(row)
      console.groupEnd()
    },
    /**
     * 表格操作 删除
     */
    onTableActionDelete (row) {
      console.group('onTableActionDelete')
      console.log(row)
      console.groupEnd()
    }
  }
}
</script>
