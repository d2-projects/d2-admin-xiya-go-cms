export default {
  data () {
    return {
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
      status: {
        isLoadingData: false,
        isLoadingDict: false
      }
    }
  },
  computed: {
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
        on-click={ this.reload || function () {} }
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
        on-click={ this.reload || function () {} }/>
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
  methods: {
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
