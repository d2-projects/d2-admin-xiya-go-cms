<template>
  <d2-container spacious>
    <template slot="header">
      <d2-bar>
        <d2-bar-cell>
          <el-button size="mini">Button</el-button>
          <el-button size="mini">Button</el-button>
        </d2-bar-cell>
        <d2-bar-space/>
        <d2-bar-cell>
          <el-button-group>
            <el-button size="mini">Button</el-button>
            <el-button size="mini">Button</el-button>
            <el-button size="mini">Button</el-button>
            <el-button size="mini">Button</el-button>
          </el-button-group>
        </d2-bar-cell>
        <d2-bar-space/>
        <d2-bar-cell>
          <el-input size="mini" style="width: 300px;"></el-input>
        </d2-bar-cell>
      </d2-bar>
    </template>
    <el-table :data="tableData" height="100%" size="mini" stripe>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
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
      tableData: [...Array(10)].map(e => ({
        name: 'FairyEver',
        address: '上海市普陀区金沙江路 1518 弄'
      }))
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      // 模拟请求数据
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 3000)
      })
    },
    onPaginationChange () {
      this.getTableData()
    }
  }
}
</script>
