export default {
  data () {
    return {
      status: {
        isLoadingData: false,
        isLoadingDict: false,
        isSubmitting: false
      }
    }
  },
  computed: {
    // 表单 loading 状态
    // 正在加载原始数据 || 正在加载字典
    isFormLoading () {
      return this.status.isLoadingData || this.status.isLoadingDict
    },
    // 表单 禁用 状态
    // 正在加载原始数据 || 正在加载字典 || 正在提交
    isFormDisabled () {
      return this.status.isLoadingData || this.status.isLoadingDict || this.status.isSubmitting
    },
    // 提交按钮 禁用 状态
    // 正在加载原始数据 || 正在加载字典 || 表单没有发生修改
    isSubmitButtonDisabled () {
      return this.status.isLoadingData || this.status.isLoadingDict || !this.isFormChanged
    },
    // 表单是否发生变化
    isFormChanged () {
      return true
    },
    // 提交按钮 loading 状态
    // 正在提交
    isSubmitButtonLoading () {
      return this.status.isSubmitting
    }
  },
  methods: {
    /**
     * @description 请求表单数据
     * @param {Function} fn 请求函数 需要返回 Promise
     */
    async doLoadData (fn = () => {}) {
      this.status.isLoadingData = true
      try {
        const data = await fn()
        this.status.isLoadingData = false
        return Promise.resolve(data)
      } catch (error) {
        console.log(error)
        this.status.isLoadingData = false
        return Promise.reject(error)
      }
    },
    /**
     * @description 发送数据
     * @param {Function} fn 请求函数 需要返回 Promise
     */
    async doSubmit (fn = () => {}) {
      this.status.isSubmitting = true
      try {
        const data = await fn()
        this.status.isSubmitting = false
        return Promise.resolve(data)
      } catch (error) {
        console.log(error)
        this.status.isSubmitting = false
        return Promise.reject(error)
      }
    }
  }
}
