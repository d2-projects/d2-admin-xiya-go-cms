export default {
  data () {
    return {
      dialog: {
        visible: false,
        showClose: false,
        top: '0px',
        width: '400px',
        customClass: 'el-dialog__no-top-border',
        appendToBody: true
      }
    }
  },
  computed: {
    // 表单容器的标题
    title () {
      return this.switchByMode('新建', '编辑')
    }
  },
  methods: {
    /**
     * @description 打开面板
     */
    open () {
      this.dialog.visible = true
      this.$nextTick(() => this.clearValidate())
    },
    /**
     * @description 关闭面板
     */
    cancle () {
      this.clearValidate()
      this.dialog.visible = false
    },
    /**
     * @description 清空表单校验
     */
    clearValidate () {
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate()
      })
    }
  }
}
