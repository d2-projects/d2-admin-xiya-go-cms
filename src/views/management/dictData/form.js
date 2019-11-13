import form from '@/mixins/crud.form'

export default {
  mixins: [ form ],
  data () {
    return {
      api: {
        detail: 'DICTDATA_DETAIL',
        create: 'DICTDATA_CREATE',
        update: 'DICTDATA_UPDATE'
      }
    }
  },
  computed: {
    setting () {
      return [
        {
          prop: 'dict_id',
          default: this.$_.get(this.search, 'form.model.dict_id', ''),
          label: '字典',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <d2-dict-select vModel={ this.form.model.dict_id } name="dict_id"/>
        },
        {
          prop: 'dict_label',
          default: '',
          label: '字典标签',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.dict_label } clearable/>
        },
        {
          prop: 'dict_value',
          default: '',
          label: '字典键值',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.dict_value } clearable/>
        },
        {
          prop: 'css_class',
          default: '',
          label: '样式属性',
          render: () => <el-input vModel={ this.form.model.css_class } clearable/>
        },
        {
          prop: 'list_class',
          default: '',
          label: '回显样式',
          render: () => <el-input vModel={ this.form.model.list_class } clearable/>
        },
        {
          prop: 'is_default',
          default: 1,
          label: '系统默认',
          render: () => <d2-dict-radio vModel={ this.form.model.is_default } name="is_default" button/>
        },
        {
          prop: 'dict_sort',
          default: 1,
          label: '显示顺序',
          render: () => <el-input-number min={ 1 } vModel={ this.form.model.dict_sort }/>
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
  },
  methods: {
    /**
     * @description 加载需要的字典数据
     */
    async loadDict () {
      // 字典
      await this.loadDictOne({
        name: 'dict_id',
        method: this.$api.DICT_ALL,
        fields: 'dict_name,id',
        path: 'list',
        label: 'dict_name'
      })
    }
  }
}
