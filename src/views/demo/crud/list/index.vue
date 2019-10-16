<template>
  <d2-container spacious>
    <template slot="header">
      <el-button type="primary" size="mini">新建</el-button>
    </template>
    <!-- 表格 -->
    <el-table :data="tableData" height="100%" size="mini" stripe>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <d2-pagination slot="footer" v-bind="pagination" @change="onPaginationChange"/>
  </d2-container>
</template>

<script>
export default {
  data () {
    return {
      pagination: {
        current: 1,
        size: 10,
        total: 10000
      },
      tableData: [...Array(50)].map(e => ({
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }))
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const listData = await this.$api.MENU_LIST()
      console.log(listData)
    }
  }
}
</script>
