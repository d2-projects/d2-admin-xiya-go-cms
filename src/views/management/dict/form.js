import form from '@/mixins/crud-form'

export default {
  mixins: [ form ],
  data () {
    return {
      api: {
        detail: 'DICT_DETAIL',
        create: 'DICT_CREATE',
        update: 'DICT_UPDATE'
      }
    }
  },
  computed: {
    setting () {
      return [
        {
          prop: 'dict_name',
          default: '',
          label: '名称',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.dict_name } clearable/>
        },
        {
          prop: 'dict_type',
          default: '',
          label: '标识',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.dict_type } clearable/>
        },
        {
          prop: 'dict_value_type',
          default: this.$env.VUE_APP_DICT_DICT_VALUE_TYPE_NUMBER,
          label: '数据类型',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <d2-dict-radio vModel={ this.form.model.dict_value_type } name="dict_value_type" disabled={ this.mode !== 'create' } button/>
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
