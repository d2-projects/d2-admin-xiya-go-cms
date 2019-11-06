import form from '@/mixins/crud.form'

export default {
  mixins: [ form ],
  computed: {
    setting () {
      return [
        {
          prop: 'post_name',
          default: '',
          label: '岗位名称',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <el-input vModel={ this.form.model.post_name }/>
        },
        {
          prop: 'post_code',
          default: '',
          label: '岗位编码',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <el-input vModel={ this.form.model.post_code }/>
        },
        {
          prop: 'post_sort',
          default: 0,
          label: '显示顺序',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <el-input-number min={ 1 } vModel={ this.form.model.post_sort }/>
        },
        {
          prop: 'status',
          default: 1,
          label: '状态',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <d2-dict-select vModel={ this.form.model.status } name="status" style="width:100px;"/>
        },
        {
          prop: 'remark',
          default: '',
          label: '备注',
          render: <el-input vModel={ this.form.model.remark }/>
        }
      ]
    }
  },
  methods: {
    /**
     * @description 初始化表单为编辑模式
     */
    async edit (id) {
      this.setMode('edit')
      this.open()
      try {
        this.form.model = await this.doLoadData(() => this.$api.POST_DETAIL(id))
      } catch (error) {
        this.cancle()
      }
    },
    /**
     * @description 提交表单
     */
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        const fn = this.switchByMode(
          () => this.$api.POST_CREATE(this.form.model),
          () => this.$api.POST_UPDATE(this.form.model)
        )
        try {
          await this.doSubmit(fn)
          this.$message({ message: '提交成功', type: 'success' })
          this.$emit('success')
          this.cancle()
        } catch (error) {}
      })
    }
  }
}
