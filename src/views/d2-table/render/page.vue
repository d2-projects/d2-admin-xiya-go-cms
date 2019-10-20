<template>
  <d2-container spacious>
    <d2-table v-bind="table"/>
  </d2-container>
</template>

<script>
import mixin from '../mixin'
export default {
  title: '渲染函数',
  name: 'render',
  mixins: [
    mixin
  ],
  data () {
    return {
      table: {
        data: [],
        columns: [
          { prop: 'name', label: '姓名' },
          { prop: 'email', label: '邮箱' },
          {
            prop: 'county',
            label: '地区',
            render: ({ row, column, index }) => <el-tag size="mini">{ row[column.property] }</el-tag>
          }
        ]
      }
    }
  }
}
</script>
