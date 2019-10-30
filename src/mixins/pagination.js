export default {
  data () {
    return {
      page: {
        current: 1,
        size: 10,
        total: 100
      }
    }
  },
  computed: {
    // 小型分页
    paginationRenderMini () {
      const pagination =
        <el-pagination
          layout="prev, pager, next"
          on-current-change={ this.onCurrentChange }
          current-page={ this.page.current }
          page-size={ this.page.size }
          total={ this.page.total }
          pager-count={ 5 }
          small>
        </el-pagination>
      return pagination
    },
    // 完整功能的分页
    paginationRenderFull () {
      const pagination =
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          page-sizes={ [ 10, 20, 30, 40 ] }
          on-size-change={ this.onSizeChange }
          on-current-change={ this.onCurrentChange }
          current-page={ this.page.current }
          page-size={ this.page.size }
          total={ this.page.total }>
        </el-pagination>
      return pagination
    }
  },
  methods: {
    onSizeChange () {
      console.log('onSizeChange')
    },
    onCurrentChange () {
      console.log('onCurrentChange')
    }
  }
}
