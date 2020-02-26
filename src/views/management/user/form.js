import form from '@/mixins/crud-form'
import utils from '@/utils/index'

export default {
  mixins: [ form ],
  data () {
    return {
      api: {
        detail: 'USER_DETAIL',
        create: 'USER_CREATE',
        update: 'USER_UPDATE'
      },
      dialog: {
        width: '900px'
      }
    }
  },
  computed: {
    setting () {
      return [
        {
          prop: 'avatar',
          default: '',
          label: '头像',
          col: { span: 24 },
          render: () => <d2-avatar-uploader vModel={ this.form.model.avatar }/>
        },
        {
          prop: 'user_name',
          default: '',
          label: '用户名',
          rule: [
            { required: true, message: '必填', trigger: 'change' },
            { validator: utils.helper.isLegalUsernameValidator, trigger: 'change' }
          ],
          col: { span: 8 },
          render: () => <el-input vModel={ this.form.model.user_name } clearable/>
        },
        {
          prop: 'nickname',
          default: '',
          label: '昵称',
          rule: { required: true, message: '必填', trigger: 'change' },
          col: { span: 8 },
          render: () => <el-input vModel={ this.form.model.nickname } clearable/>
        },
        {
          prop: 'sex',
          default: this.$env.VUE_APP_DICT_EMPTY_NUMBER,
          label: '性别',
          col: { span: 8 },
          render: () => <d2-dict-radio name="sex" vModel={ this.form.model.sex } all all-label="未知" button/>
        },
        ...this.mode === 'create' ? [
          {
            prop: 'password',
            default: '',
            label: '密码',
            rule: { required: true, message: '必填', trigger: 'change' },
            col: { span: 8 },
            render: () => <el-input vModel={ this.form.model.password } type="password" clearable/>
          }
        ] : [],
        {
          prop: 'phone',
          default: '',
          label: '手机号码',
          rule: { validator: utils.helper.isLegalMobilePhoneValidator, trigger: 'change' },
          col: { span: 8 },
          render: () => <el-input vModel={ this.form.model.phone } clearable/>
        },
        {
          prop: 'email',
          default: '',
          label: '邮箱',
          rule: { validator: utils.helper.isLegalEmailValidator, trigger: 'change' },
          col: { span: 8 },
          render: () => <el-input vModel={ this.form.model.email } clearable/>
        },
        {
          prop: 'dept_id',
          default: '',
          label: '归属部门',
          rule: { required: true, message: '必填', trigger: 'change' },
          col: { span: 8 },
          render: () => <d2-tree-popover vModel={ this.form.model.dept_id } source="DEPT_ALL" key-label="dept_name"/>
        },
        {
          prop: 'user_post',
          default: '',
          label: '岗位',
          col: { span: 8 },
          render: () => <d2-dict-select name="user_post" vModel={ this.form.model.user_post } style="width: 100%;" custom multiple stringify/>
        },
        {
          prop: 'user_role',
          default: '',
          label: '角色',
          col: { span: 8 },
          render: () => <d2-dict-select name="user_role" vModel={ this.form.model.user_role } style="width: 100%;" custom multiple stringify/>
        },
        {
          prop: 'status',
          default: this.$env.VUE_APP_DICT_STATUS_ACTIVE,
          label: '状态',
          col: { span: 8 },
          render: () => <d2-dict-radio vModel={ this.form.model.status } name="status" button/>
        },
        {
          prop: 'remark',
          default: '',
          label: '备注',
          col: { span: 24 },
          render: () => <el-input vModel={ this.form.model.remark } clearable/>
        }
      ]
    }
  },
  methods: {
    /**
     * @description 加载需要的字典数据
     */
    loadDict () {
      // 岗位
      this.loadDictOne({
        name: 'user_post',
        method: this.$api.POST_ALL,
        fields: 'id,post_name',
        path: 'list',
        label: 'post_name'
      })
      // 角色
      this.loadDictOne({
        name: 'user_role',
        method: this.$api.ROLE_ALL,
        fields: 'id,role_name',
        path: 'list',
        label: 'role_name'
      })
    },
    /**
     * @description 在提交表单之前可选进行数据处理
     * @param {Object} data 默认的表单数据
     */
    transformSubmitData (data) {
      if (this.mode === 'edit') {
        // 编辑模式下删除密码字段
        return this._.omit(data, [ 'password' ])
      } else {
        // 新建模式下全部发送
        return data
      }
    }
  }
}
