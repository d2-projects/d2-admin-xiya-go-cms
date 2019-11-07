import form from '@/mixins/crud.form'

export default {
  mixins: [ form ],
  data () {
    return {
      api: {
        detail: 'USER_DETAIL',
        create: 'USER_CREATE',
        update: 'USER_UPDATE'
      }
    }
  },
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
        },
        {
          prop: 'status',
          default: 1,
          label: '状态',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <d2-dict-radio vModel={ this.form.model.status } name="status"/>
        },
        {
          prop: 'remark',
          default: '',
          label: '备注',
          render: <el-input vModel={ this.form.model.remark }/>
        }
      ]
    }
  }
}
