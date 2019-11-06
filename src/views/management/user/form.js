import form from '@/mixins/crud.form'

export default {
  mixins: [ form ],
  computed: {
    setting () {
      return [
        {
          prop: 'nickname',
          default: '',
          label: '昵称',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <el-input vModel={ this.form.model.nickname }/>
        },
        {
          prop: 'user_name',
          default: '',
          label: '登录账号',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <el-input vModel={ this.form.model.user_name }/>
        },
        {
          prop: 'user_type',
          default: 1,
          label: '用户类型',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <d2-dict-select name="user_type" vModel={ this.form.model.user_type }/>
        },
        {
          prop: 'email',
          default: '',
          label: '邮箱',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <el-input vModel={ this.form.model.email }/>
        },
        {
          prop: 'phone',
          default: '',
          label: '手机号码',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <el-input vModel={ this.form.model.phone }/>
        },
        {
          prop: 'phonenumber',
          default: '',
          label: '座机',
          render: <el-input vModel={ this.form.model.phonenumber }/>
        },
        {
          prop: 'sex',
          default: 1,
          label: '性别',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <d2-dict-select name="sex" vModel={ this.form.model.sex }/>
        },
        {
          prop: 'avatar',
          default: '',
          label: '头像',
          render: <el-input vModel={ this.form.model.avatar }/>
        },
        {
          prop: 'password',
          default: '',
          label: '登录密码',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <el-input vModel={ this.form.model.password }/>
        },
        {
          prop: 'user_post',
          default: '',
          label: '岗位',
          render: <el-input vModel={ this.form.model.user_post }/>
        },
        {
          prop: 'user_role',
          default: '',
          label: '角色',
          render: <el-input vModel={ this.form.model.user_role }/>
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
        this.form.model = await this.doLoadData(() => this.$api.USER_DETAIL(id))
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
          () => this.$api.USER_CREATE(this.form.model),
          () => this.$api.USER_UPDATE(this.form.model)
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
