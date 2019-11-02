import { cloneDeep } from 'lodash'
import utils from '@/utils'

export default {
  data () {
    return {
      // 主体表格
      table: {
        data: [],
        columns: []
      },
      // 搜索
      search: {
        panel: {
          active: false
        },
        form: {
          model: {},
          inline: true,
          labelPosition: 'top'
        }
      },
      // 主体表格列过滤
      columnsFilter: {
        options: []
      },
      // 分页
      pagination: {
        current: 1,
        size: 10,
        total: 100
      },
      // 页面状态
      status: {
        isLoadingData: false,
        isLoadingDict: false
      },
      // 排序
      sort: {
        prop: '',
        type: ''
      }
    }
  },
  computed: {
    // vNode
    // 搜索表单
    vNodeSearchForm () {
      const form =
        <el-form { ...{ attrs: this.search.form } } class="is-thin">
          {
            this.settingSearch.map(item => {
              const formItem =
                <el-form-item
                  label={ item.label }
                  prop={ item.prop }>
                  { item.render }
                </el-form-item>
              return formItem
            })
          }
          <el-form-item label="操作">
            { this.vNodeButtonSearchInForm }
          </el-form-item>
        </el-form>
      return form
    },
    // vNode
    // 搜索按钮
    // 搜索表单中的搜索按钮
    vNodeButtonSearchInForm () {
      const button =
        <d2-button
          icon="el-icon-search"
          label="搜索"
          type="primary"
          loading={ this.isSearchButtonLoading }
          on-click={ this.research || function () {} }
          thin/>
      return button
    },
    // vNode
    // 搜索按钮
    // 顶栏始终显示的搜索按钮
    vNodeButtonSearch () {
      const button =
        <d2-button
          icon="el-icon-refresh"
          label="刷新"
          loading={ this.isSearchButtonLoading }
          on-click={ this.research || function () {} }/>
      return button
    },
    // vNode
    // 新建按钮
    vNodeButtonCreate () {
      const button =
        <d2-button
          type="primary"
          icon="el-icon-plus"
          label="新建"
          on-click={ this.create || function () {} }/>
      return button
    },
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
    },
    // 搜索按钮 loading 状态
    // 正在加载原始数据 || 正在加载字典
    isSearchButtonLoading () {
      return this.status.isLoadingData || this.status.isLoadingDict
    },
    // 表格 loading 状态
    // 正在加载原始数据 || 正在加载字典
    isTableLoading () {
      return this.status.isLoadingData || this.status.isLoadingDict
    },
    // 搜索时发送的数据
    // 自动整合 [搜索项] [分页设置] [排序]
    searchData () {
      return {
        ...this.search.form.model,
        page: this.pagination.current,
        page_size: this.pagination.size,
        order_column_name: this.sort.prop,
        order_type: this.sort.type
      }
    }
  },
  created () {
    this.initSearchForm()
    this.initTableColumns()
  },
  methods: {
    /**
     * @description 表格排序变化时触发
     */
    onTableSortChange ({ prop, order }) {
      this.sort.prop = prop
      switch (order) {
        case 'ascending':
          this.sort.type = 'ASC'
          break
        case 'descending':
          this.sort.type = 'DESC'
          break
        default:
          this.sort.type = ''
          break
      }
      this.research()
    },
    // init
    // 根据 settingSearch 初始化搜索条件
    initSearchForm () {
      if (this.settingSearch === undefined) return
      const data = {}
      this.settingSearch.forEach(setting => {
        data[setting.prop] = setting.default
      })
      this.search.form.model = data
    },
    // init
    // 合并 settingColumns 和 settingActions
    // 并加上 id
    initTableColumns () {
      const columns = utils.fn.arrayAddUniqueId([
        ...this.settingColumns,
        ...this.settingActions
      ])
      this.table.columns = cloneDeep(columns.filter(e => e.show !== false))
      this.columnsFilter.options = cloneDeep(columns)
    },
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
    },
    /**
     * @description 请求表格数据
     * @param {Function} fn 请求函数 需要返回 Promise
     */
    async doLoadData (fn) {
      this.status.isLoadingData = true
      try {
        const data = await fn()
        this.status.isLoadingData = false
        return Promise.resolve(data)
      } catch (error) {
        this.status.isLoadingData = false
        return Promise.reject(error)
      }
    },
    /**
     * @description 请求字典数据
     * @param {Function} fn 请求函数 需要返回 Promise
     */
    async doLoadDict (fn) {
      this.status.isLoadingDict = true
      try {
        const data = await fn()
        this.status.isLoadingDict = false
        return Promise.resolve(data)
      } catch (error) {
        this.status.isLoadingDict = false
        return Promise.reject(error)
      }
    }
  }
}
