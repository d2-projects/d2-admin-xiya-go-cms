import form from '@/mixins/crud.form'
import utils from '@/utils/index'

export default {
  mixins: [ form ],
  data () {
    return {
      api: {
        detail: 'DEPT_DETAIL',
        create: 'DEPT_CREATE',
        update: 'DEPT_UPDATE'
      }
    }
  },
  computed: {
    setting () {
      return [
        {
          prop: 'dept_name',
          default: '',
          label: '部门名称',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <el-input vModel={ this.form.model.dept_name }/>
        },
        {
          prop: 'leader',
          default: '',
          label: '负责人',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <el-input vModel={ this.form.model.leader }/>
        },
        {
          prop: 'email',
          default: '',
          label: '部门邮箱',
          rule: [
            { required: true, message: '必填', trigger: 'change' },
            { validator: (rule, value, callback) => callback(utils.helper.isLegalEmail(value) ? undefined : new Error('邮箱格式不正确')), trigger: 'change' }
          ],
          render: <el-input vModel={ this.form.model.email }/>
        },
        {
          prop: 'phone',
          default: '',
          label: '部门电话',
          rule: [
            { required: true, message: '必填', trigger: 'change' },
            { validator: (rule, value, callback) => callback(utils.helper.isLegalPhone(value) ? undefined : new Error('电话格式不正确')), trigger: 'change' }
          ],
          render: <el-input vModel={ this.form.model.phone }/>
        },
        {
          prop: 'parent_id',
          default: 0,
          label: '上级部门',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <d2-tree-popover vModel={ this.form.model.parent_id } source="DEPT_ALL" key-label="dept_name"/>
        },
        {
          prop: 'order_num',
          default: 1,
          label: '显示排序',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: <el-input-number min={ 1 } vModel={ this.form.model.order_num }/>
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
     * @description 初始化表单为新建模式
     * @description 树形结构表格 重新定义新建方法
     */
    async create (pid = 0) {
      this.setFormData({
        parent_id: pid
      })
      this.setMode('create')
      this.open()
    }
  }
}
