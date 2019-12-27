import form from '@/mixins/crud-form'
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
          render: () => <el-input vModel={ this.form.model.dept_name } clearable/>
        },
        {
          prop: 'parent_id',
          default: 0,
          label: '上级部门',
          render: () => <d2-tree-popover vModel={ this.form.model.parent_id } source="DEPT_ALL" key-label="dept_name"/>
        },
        {
          prop: 'leader',
          default: '',
          label: '负责人',
          render: () => <el-input vModel={ this.form.model.leader } clearable/>
        },
        {
          prop: 'email',
          default: '',
          label: '部门邮箱',
          rule: { validator: utils.helper.isLegalEmailValidator, trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.email } clearable/>
        },
        {
          prop: 'phone',
          default: '',
          label: '部门电话',
          rule: { validator: utils.helper.isLegalMobilePhoneValidator, trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.phone } clearable/>
        },
        {
          prop: 'order_num',
          default: this.$env.VUE_APP_FORM_SORT_MIN,
          label: '显示排序',
          render: () => <el-input-number min={ this.$env.VUE_APP_FORM_SORT_MIN } vModel={ this.form.model.order_num }/>
        },
        {
          prop: 'status',
          default: this.$env.VUE_APP_DICT_STATUS_ACTIVE,
          label: '状态',
          render: () => <d2-dict-radio vModel={ this.form.model.status } name="status" button/>
        },
        {
          prop: 'remark',
          default: '',
          label: '备注',
          render: () => <el-input vModel={ this.form.model.remark } clearable/>
        }
      ]
    }
  }
}
