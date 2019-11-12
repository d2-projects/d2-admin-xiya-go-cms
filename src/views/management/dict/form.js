import form from '@/mixins/crud.form'

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
          label: '字典名称',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.dict_name } clearable/>
        },
        {
          prop: 'dict_type',
          default: '',
          label: '字典类型',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.dict_type } clearable/>
        },
        {
          prop: 'status',
          default: 1,
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
