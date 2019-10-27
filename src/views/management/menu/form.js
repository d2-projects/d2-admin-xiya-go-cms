import { cloneDeep } from 'lodash'
import utils from '@/utils'
import form from '@/mixins/form'

function setting (h = () => {}) {
  let form = this.form.model
  return [
    {
      prop: 'menu_name',
      default: '',
      label: '菜单名称',
      rule: { required: true, message: '请设置菜单名称', trigger: 'blur' },
      render: <el-input vModel={ form.menu_name }/>
    },
    {
      prop: 'parent_id',
      default: 0,
      label: '上级菜单',
      rule: { required: true, message: '请设置上级菜单', trigger: 'change' },
      render: <d2-select-tree-menu-dialog vModel={ form.parent_id }/>
    },
    {
      prop: 'order_num',
      default: 0,
      label: '显示排序',
      rule: { required: true, message: '请设置显示排序', trigger: 'blur' },
      render: <el-input-number min={ 1 } vModel={ form.order_num }/>
    },
    {
      prop: 'url',
      default: '/',
      label: '请求地址',
      rule: { required: true, message: '请设置请求地址', trigger: 'blur' },
      render: <el-input vModel={ form.url }/>
    },
    {
      prop: 'menu_type',
      default: 1,
      label: '菜单类型',
      rule: { required: true, message: '请设置请求地址', trigger: 'blur' },
      render: <d2-dict-select name="menu_type" vModel={ form.menu_type }/>
    },
    {
      prop: 'visible',
      default: 1,
      label: '菜单状态',
      rule: { required: true, message: '请设置菜单状态', trigger: 'blur' },
      render: <d2-dict-select name="visible" vModel={ form.visible }/>
    },
    {
      prop: 'perms',
      default: '',
      label: '权限标识',
      render: <el-input vModel={ form.perms }/>
    },
    {
      prop: 'icon',
      default: '',
      label: '图标',
      render: <d2-icon-select vModel={ form.icon }/>
    },
    {
      prop: 'remark',
      default: '',
      label: '备注',
      render: <el-input vModel={ form.remark }/>
    }
  ]
}

const formData = utils.helper.getFormFromSetting(setting)
const formRules = utils.helper.getRulesFromSetting(setting)

export default {
  mixins: [
    form
  ],
  render () {
    return <el-dialog
      { ...{ attrs: this.dialog } }
      title={ this.title }
      on-close={ () => { this.dialog.visible = false } }>
      <el-form
        ref="form"
        { ...{ attrs: this.form } }
        disabled={ this.isFormDisabled }
        v-loading={ this.isFormLoading }>
        {
          setting.call(this, this.$createElement).map(
            item =>
              <el-form-item label={ item.label } prop={ item.prop }>
                { item.render }
              </el-form-item>
          )
        }
      </el-form>
      <el-form label-width={ this.form.labelWidth }>
        <el-form-item>
          <d2-button { ...{ attrs: this.buttons.cancle } } on-click={ this.cancle }/>
          <d2-button { ...{ attrs: this.buttons.submit } } on-click={ this.submit }/>
        </el-form-item>
      </el-form>
    </el-dialog>
  },
  data () {
    return {
      form: {
        model: formData,
        rules: formRules,
        labelWidth: '100px'
      },
      buttons: {
        cancle: {
          label: '取消',
          plain: true
        },
        submit: {
          label: '保存',
          type: 'primary',
          icon: 'el-icon-check'
        }
      }
    }
  },
  methods: {
    /**
     * @description 初始化表单为编辑模式
     */
    async edit (id) {
      this.open()
      try {
        const data = await this.doLoadData(() => this.$api.MENU_DETAIL(id))
        this.form.model = data
        this.mode = 'edit'
      } catch (error) {
        this.cancle()
      }
    },
    /**
     * @description 初始化表单为新建模式
     */
    async create (pid = 0) {
      this.open()
      const data = cloneDeep(formData)
      data.parent_id = pid
      this.form.model = data
      this.mode = 'create'
    },
    /**
     * @description 点击确定
     */
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        let fn = () => {}
        if (this.mode === 'create') fn = () => this.$api.MENU_CREATE(this.form.model)
        if (this.mode === 'edit') fn = () => this.$api.MENU_UPDATE(this.form.model)
        try {
          await this.doSubmit(fn)
          this.$message({ message: '提交成功', type: 'success' })
          this.$emit('success')
          this.cancle()
        } catch (error) {}
      })
    }
  }
}
