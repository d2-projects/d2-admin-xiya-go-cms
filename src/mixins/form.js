export default {
  data () {
    return {
      dialog: {
        visible: false,
        showClose: false,
        top: '0px',
        width: '400px',
        customClass: 'el-dialog__no-top-border',
        destroyOnClose: true,
        appendToBody: true
      },
      status: {
        isLoadingData: false,
        isLoadingDict: false,
        isSubmitting: false
      },
      mode: ''
    }
  },
  computed: {
    title () {
      let title = ''
      if (this.mode === 'edit') title = '编辑'
      if (this.mode === 'create') title = '新建'
      return title
    },
    isFormDisabled () {
      return this.status.isLoadingData || this.status.isLoadingDict
    },
    isFormLoading () {
      return this.status.isLoadingData || this.status.isLoadingDict
    },
    isSubmitButtonLoading () {
      return false
    }
  },
  methods: {
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
    },
    async doSubmit (fn) {
      this.status.isSubmitting = true
      try {
        const data = await fn()
        this.status.isSubmitting = false
        return Promise.resolve(data)
      } catch (error) {
        this.status.isSubmitting = false
        return Promise.reject(error)
      }
    },
    /**
     * @description 打开面板
     */
    open () {
      this.dialog.visible = true
    },
    /**
     * @description 关闭面板
     */
    cancle () {
      this.dialog.visible = false
    }
  }
}
