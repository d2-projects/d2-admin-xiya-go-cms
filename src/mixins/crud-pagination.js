export default {
  data () {
    return {
      // 分页
      pagination: {
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  computed: {
    // 为搜索参数提供数据
    paginationSearchData () {
      return {
        page: this.pagination.current,
        page_size: this.pagination.size
      }
    },
    // vNode
    // 小型分页
    vNodePaginationMini () {
      const node =
        <el-pagination
          layout="prev, pager, next"
          on-current-change={
            current => {
              this.pagination.current = current
              this.research()
            }
          }
          current-page={ this.pagination.current }
          page-size={ this.pagination.size }
          total={ this.pagination.total }
          pager-count={ 5 }
          small>
        </el-pagination>
      return node
    },
    // vNode
    // 完整功能的分页
    vNodePaginationFull () {
      const node =
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          page-sizes={ [ 10, 20, 30, 40 ] }
          on-size-change={
            size => {
              this.pagination.size = size
              this.research()
            }
          }
          on-current-change={
            current => {
              this.pagination.current = current
              this.research()
            }
          }
          current-page={ this.pagination.current }
          page-size={ this.pagination.size }
          total={ this.pagination.total }>
        </el-pagination>
      return node
    }
  },
  methods: {
    /**
     * @description 分页组件
     * @description 整体更新
     * @description 这是一个常见的通用更新页码方式，适用于一般的查询返回
     */
    paginationUpdate (page) {
      this.paginationUpdateCurrent(page.page_no)
      this.paginationUpdateSize(page.page_size)
      this.paginationUpdateTotal(page.tatal_count)
    },
    /**
     * @description 重置分页
     */
    paginationReset () {
      this.paginationUpdateCurrent(1)
      this.paginationUpdateSize(10)
      this.paginationUpdateTotal(0)
    },
    /**
     * @description 分页组件
     * @description 更新当前页码
     */
    paginationUpdateCurrent (value) {
      this.pagination.current = value
    },
    /**
     * @description 分页组件
     * @description 更新分页大小
     */
    paginationUpdateSize (value) {
      this.pagination.size = value
    },
    /**
     * @description 分页组件
     * @description 更新总页数
     */
    paginationUpdateTotal (value) {
      this.pagination.total = value
    }
  }
}
