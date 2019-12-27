import form from '@/mixins/crud-form'

export default {
  mixins: [ form ],
  props: {
    dictType: {
      type: Number,
      default: 1,
      required: true
    }
  },
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
      const dictValueNumber = {
        prop: 'dict_number',
        default: 1,
        label: '字典键值',
        rule: { required: true, message: '必填', trigger: 'change' },
        render: () => <el-input-number min={ 1 } vModel={ this.form.model.dict_number }/>
      }
      const dictValueString = {
        prop: 'dict_value',
        default: '',
        label: '字典键值',
        rule: { required: true, message: '必填', trigger: 'change' },
        render: () => <el-input vModel={ this.form.model.dict_value } clearable/>
      }
      const dictValue = this.dictType === 1 ? dictValueNumber : dictValueString
      return [
        {
          prop: 'dict_id',
          default: this._.get(this.search, 'form.model.dict_id', ''),
          label: '字典',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <d2-dict value={ this.form.model.dict_id } name="dict_id" custom disabled/>
        },
        {
          prop: 'dict_label',
          default: '',
          label: '字典标签',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.dict_label } clearable/>
        },
        dictValue,
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
          default: this.$env.VUE_APP_DICT_IS_FALSE,
          label: '系统默认',
          render: () => <d2-dict-radio vModel={ this.form.model.is_default } name="is" button/>
        },
        {
          prop: 'dict_sort',
          default: this.$env.VUE_APP_FORM_SORT_MIN,
          label: '显示顺序',
          render: () => <el-input-number min={ this.$env.VUE_APP_FORM_SORT_MIN } vModel={ this.form.model.dict_sort }/>
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
  },
  methods: {
    /**
     * @description 加载需要的字典数据
     */
    loadDict () {
      // 字典
      this.loadDictOne({
        name: 'dict_id',
        method: this.$api.DICT_ALL,
        fields: 'dict_name,id',
        path: 'list',
        label: 'dict_name'
      })
    }
  }
}
