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
            width: '200px',
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
            render: ({ row }) => <el-tag>{ row.url }</el-tag>
          },
          {
            prop: 'menu_type',
            label: '菜单类型'
          },
          {
            prop: 'created_at',
            label: '创建时间',
            formatter: row => utils.time.format(row.created_at)
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
    }
  }
}
</script>
