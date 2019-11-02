export default {
  data () {
    return {
      pagination: {
        current: 1,
        size: 10,
        total: 100
      }
    }
  },
  computed: {
    // 小型分页
    vNodePaginationMini () {
      const pagination =
        <el-pagination
          layout="prev, pager, next"
          on-current-change={ this.paginationCurrentChange }
          current-page={ this.pagination.current }
          page-size={ this.pagination.size }
          total={ this.pagination.total }
          pager-count={ 5 }
          small>
        </el-pagination>
      return pagination
    },
    // 完整功能的分页
    vNodePaginationFull () {
      const pagination =
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          page-sizes={ [ 10, 20, 30, 40 ] }
          on-size-change={ this.paginationSizeChange }
          on-current-change={ this.paginationCurrentChange }
          current-page={ this.pagination.current }
          page-size={ this.pagination.size }
          total={ this.pagination.total }>
        </el-pagination>
      return pagination
    }
  },
  methods: {
    // 分页组件 更新
    // 这是一个常见的通用更新页码方式，适用于一般的查询返回
    paginationUpdate (page) {
      this.paginationUpdateCurrent(page.page_no)
      this.paginationUpdateSize(page.page_size)
      this.paginationUpdateTotal(page.tatal_count)
    },
    // 分页组件 更新当前页码
    paginationUpdateCurrent (value) {
      this.pagination.current = value
    },
    // 分页组件 更新分页大小
    paginationUpdateSize (value) {
      this.pagination.size = value
    },
    // 分页组件 更新总页数
    paginationUpdateTotal (value) {
      this.pagination.total = value
    },
    // 分页组件 更新分页尺寸的时候触发
    paginationSizeChange () {
      console.log('paginationSizeChange')
    },
    // 分页组件 当前页码更新时触发
    paginationCurrentChange () {
      console.log('paginationCurrentChange')
    }
  }
}
