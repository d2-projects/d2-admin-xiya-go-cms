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
          prop: 'dept_id',
          default: '',
          label: '归属部门',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <d2-tree-popover vModel={ this.form.model.dept_id } source="DEPT_ALL" key-label="dept_name"/>
        },
        {
          prop: 'phone',
          default: '',
          label: '手机号码',
          render: <el-input vModel={ this.form.model.phone }/>
        },
        {
          prop: 'email',
          default: '',
          label: '邮箱',
          render: <el-input vModel={ this.form.model.email }/>
        },
        {
          prop: 'user_name',
          default: '',
          label: '用户名',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <el-input vModel={ this.form.model.user_name }/>
        },
        {
          prop: 'password',
          default: '',
          label: '密码',
          rule: { required: true, message: '必填', trigger: 'change' },
          if: this.mode === 'create',
          render: <el-input vModel={ this.form.model.password }/>
        },
        {
          prop: 'sex',
          default: 0,
          label: '性别',
          render: <d2-dict-select name="sex" vModel={ this.form.model.sex }/>
        },
        {
          prop: 'status',
          default: 1,
          label: '状态',
          render: <d2-dict-radio vModel={ this.form.model.status } name="status"/>
        },
        {
          prop: 'user_post',
          default: '',
          label: '岗位',
          render: <d2-dict-select name="user_post" vModel={ this.form.model.user_post } multiple stringify/>
        },
        {
          prop: 'user_role',
          default: '',
          label: '角色',
          render: <d2-dict-select name="user_role" vModel={ this.form.model.user_role } multiple stringify/>
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
     * @description 加载需要的字典数据
     */
    async loadDict () {
      // 岗位
      await this.loadDictOne({
        name: 'user_post',
        method: this.$api.POST_ALL,
        query: { fields: 'id,post_name' },
        path: 'list',
        label: 'post_name'
      })
      // 角色
      await this.loadDictOne({
        name: 'user_role',
        method: this.$api.ROLE_ALL,
        query: { fields: 'id,role_name' },
        path: 'list',
        label: 'role_name'
      })
    }
  }
}
