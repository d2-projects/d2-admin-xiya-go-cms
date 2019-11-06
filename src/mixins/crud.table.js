import { cloneDeep, isArray, isObject, isFunction } from 'lodash'
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
    // 主体表格
    vNodeTable () {
      const node =
        <d2-table
          ref="table"
          { ...{ attrs: this.table } }
          loading={ this.isTableLoading }
          on-sort-change={ this.onTableSortChange }/>
      return node
    },
    // vNode
    // 搜索表单
    vNodeSearchForm () {
      const node =
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
            { this.vNodeButtonSearchFormResetInForm }
          </el-form-item>
        </el-form>
      return node
    },
    // vNode
    // 搜索按钮
    // 搜索表单中的搜索按钮
    vNodeButtonSearchInForm () {
      const node =
        <d2-button
          icon="el-icon-search"
          label="搜索"
          type="primary"
          loading={ this.isSearchButtonLoading }
          on-click={ this.research || function () {} }
          thin/>
      return node
    },
    // vNode
    // 搜索表单中的重置按钮
    vNodeButtonSearchFormResetInForm () {
      const node =
        <d2-button
          icon="el-icon-refresh"
          label="重置"
          on-click={ this.searchFormReset }
          plain
          thin/>
      return node
    },
    // vNode
    // 搜索按钮
    // 顶栏始终显示的搜索按钮
    vNodeButtonSearch () {
      const node =
        <d2-button
          icon="el-icon-refresh"
          label="刷新"
          loading={ this.isSearchButtonLoading }
          on-click={ this.research || function () {} }/>
      return node
    },
    // vNode
    // 列过滤触发按钮
    vNodeButtonTableColumnsFilterTrigger () {
      const node =
        <d2-button
          icon="el-icon-set-up"
          label="设置"
          on-click={ this.tableColumnsFilterStart }/>
      return node
    },
    // vNode
    // 表格列设置
    vNodeTableColumnsFilter () {
      const node =
        <d2-table-columns-filter
          ref="d2-table-columns-filter"
          { ...{ attrs: this.columnsFilter } }
          vModel={ this.table.columns }/>
      return node
    },
    // vNode
    // 新建按钮
    vNodeButtonCreate () {
      const node =
        <d2-button
          type="primary"
          icon="el-icon-plus"
          label="新建"
          on-click={ this.create || function () {} }/>
      return node
    },
    // vNode
    // 小型分页
    vNodePaginationMini () {
      const node =
        <el-pagination
          layout="prev, pager, next"
          on-current-change={ this.research || function () {} }
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
          on-size-change={ this.research || function () {} }
          on-current-change={ this.research || function () {} }
          current-page={ this.pagination.current }
          page-size={ this.pagination.size }
          total={ this.pagination.total }>
        </el-pagination>
      return node
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
  async created () {
    this.initSearchForm()
    this.initTableColumns()
    await this.loadDict()
    await this.research()
  },
  methods: {
    /**
     * @description 需要在外部实现
     * @description 加载数据
     */
    async research () {
      this.table.data = []
      const search = this.$api[this.api.index]
      if (!isFunction(search)) return
      const result = await search(this.searchData)
      if (isArray(result)) {
        this.table.data = result
      } else if (isObject(result) && isArray(result.list) && isObject(result.page)) {
        const { list, page } = result
        this.paginationUpdate(page)
        this.table.data = list
      }
    },
    /**
     * @description 加载字典数据
     */
    async loadDict () {
      await this.doLoadDict(() => Promise.resolve({}))
    },
    /**
     * @description 需要在外部实现
     * @description 新建
     */
    create () {
      this.$refs['form-component'].create()
    },
    /**
     * @description 需要在外部实现
     * @description 编辑
     * @param {Number} id 编辑行的 id
     */
    edit (id) {},
    /**
     * @description 需要在外部实现
     * @description 删除
     * @param {Number} id 删除行的 id
     */
    delete (id) {},
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
    /**
     * @description 触发列设置面板显示
     */
    tableColumnsFilterStart () {
      this.$refs['d2-table-columns-filter'].start()
    },
    /**
     * @description init
     * @description 根据 settingSearch 初始化搜索条件
     */
    initSearchForm () {
      if (this.settingSearch === undefined) return
      const data = {}
      this.settingSearch.forEach(setting => {
        data[setting.prop] = setting.default
      })
      this.search.form.model = data
    },
    /**
     * @description 重置搜索表单
     */
    searchFormReset () {
      this.initSearchForm()
      this.research()
    },
    /**
     * @description init
     * @description 合并 settingColumns 和 settingActions
     * @description 并加上 id
     */
    initTableColumns () {
      const columns = utils.fn.arrayAddUniqueId([
        ...this.settingColumns,
        ...this.settingActions
      ])
      this.table.columns = cloneDeep(columns.filter(e => e.show !== false))
      this.columnsFilter.options = cloneDeep(columns)
    },
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
