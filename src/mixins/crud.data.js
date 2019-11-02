import { cloneDeep } from 'lodash'
import utils from '@/utils'

export default {
  data () {
    return {
      // 主体表格相关
      table: {
        data: [],
        columns: []
      },
      // 搜索相关
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
      // 主体表格列过滤相关
      columnsFilter: {
        options: []
      },
      status: {
        isLoadingData: false,
        isLoadingDict: false
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
    // 搜索按钮 loading 状态
    // 正在加载原始数据 || 正在加载字典
    isSearchButtonLoading () {
      return this.status.isLoadingData || this.status.isLoadingDict
    },
    // 表格 loading 状态
    // 正在加载原始数据 || 正在加载字典
    isTableLoading () {
      return this.status.isLoadingData || this.status.isLoadingDict
    }
  },
  created () {
    this.initSearchForm()
    this.initTableColumns()
  },
  methods: {
    // init
    // 根据 settingSearch 初始化搜索条件
    initSearchForm () {
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
