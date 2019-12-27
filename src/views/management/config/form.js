import form from '@/mixins/crud-form'

export default {
  mixins: [ form ],
  data () {
    return {
      api: {
        detail: 'CONFIG_DETAIL',
        create: 'CONFIG_CREATE',
        update: 'CONFIG_UPDATE'
      }
    }
  },
  computed: {
    setting () {
      return [
        {
          prop: 'config_name',
          default: '',
          label: '参数名称',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.config_name } clearable/>
        },
        {
          prop: 'config_key',
          default: '',
          label: '参数键名',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.config_key } clearable/>
        },
        {
          prop: 'config_value',
          default: '',
          label: '参数键值',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.config_value } clearable/>
        },
        {
          prop: 'config_type',
          default: this.$env.VUE_APP_DICT_IS_TRUE,
          label: '系统内置',
          render: () => <d2-dict-radio vModel={ this.form.model.config_type } name="is" button/>
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
