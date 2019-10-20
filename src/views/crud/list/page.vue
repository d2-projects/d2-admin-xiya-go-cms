<template>
  <d2-container spacious>
    <d2-bar slot="header">
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
        <el-button size="mini">Button</el-button>
      </d2-bar-cell>
      <d2-bar-space/>
      <d2-bar-cell>
        <el-input size="mini" style="width: 200px;"></el-input>
      </d2-bar-cell>
      <d2-bar-cell>
        <d2-export-table>
          <el-button size="mini">
            <d2-icon name="download"/>
          </el-button>
        </d2-export-table>
      </d2-bar-cell>
    </d2-bar>
    <d2-table v-bind="table"/>
    <d2-pagination slot="footer" v-bind="pagination" @change="onPaginationChange"/>
  </d2-container>
</template>

<script>
// 模拟数据接口
function TABLE_LIST () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...Array(10)].map(e => ({
        name: 'FairyEver',
        uuid: (Math.random() * 100000).toFixed(0),
        address: '上海市普陀区金沙江路 1518 弄'
      })))
    }, 1000)
  })
}

export default {
  title: '列表',
  name: 'list',
  data () {
    return {
      pagination: {
        current: 1,
        size: 10,
        total: 10000
      },
      table: {
        data: [],
        columns: [
          {
            prop: 'uuid',
            label: 'UUID'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ]
      }
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    async getTableData () {
      const result = await TABLE_LIST()
      this.table.data = result
    },
    onPaginationChange () {
      this.getTableData()
    }
  }
}
</script>
