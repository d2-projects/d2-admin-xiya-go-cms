import { cloneDeep } from 'lodash'
import utils from '@/utils'

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
  render () {
    return <el-dialog
      { ...{ attrs: this.dialog } }
      title={ this.title }
      on-close={ () => { this.dialog.visible = false } }>
      <el-form { ...{ attrs: this.form } } ref="form">
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
      dialog: {
        visible: false,
        showClose: false,
        top: '0px',
        width: '400px',
        customClass: 'el-dialog__no-top-border',
        destroyOnClose: true,
        appendToBody: true
      },
      form: {
        model: formData,
        rules: formRules,
        disabled: false,
        labelWidth: '100px'
      },
      buttons: {
        cancle: {
          text: '取消',
          plain: true
        },
        submit: {
          text: '保存',
          type: 'primary',
          icon: 'el-icon-check',
          loading: false
        }
      },
      mode: ''
    }
  },
  computed: {
    title () {
      let title = ''
      if (this.mode === 'edit') title = '编辑'
      if (this.mode === 'create') title = '新建'
      return title
    }
  },
  methods: {
    /**
     * @description 初始化表单
     */
    init ({ data = {}, mode = 'edit' } = {}) {
      if (mode === 'edit') this.form.model = cloneDeep(data)
      if (mode === 'create') this.form.model = Object.assign(cloneDeep(formData), data)
      this.mode = mode
      this.dialog.visible = true
    },
    /**
     * @description 关闭面板
     */
    cancle () {
      this.dialog.visible = false
    },
    /**
     * @description 点击确定
     */
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        this.submitting(true)
        try {
          if (this.mode === 'create') {
            await this.$api.MENU_CREATE(this.form.model)
            this.$message({ message: '创建成功', type: 'success' })
          }
          if (this.mode === 'edit') {
            await this.$api.MENU_UPDATE(this.form.model)
            this.$message({ message: '修改成功', type: 'success' })
          }
          this.submitting(false)
          this.$emit('success')
          this.cancle()
        } catch (error) {}
        this.submitting(false)
      })
    },
    /**
     * @description 设置是否正在提交
     * @description 禁用表单
     * @description 设置提交按钮 loading 状态
     */
    submitting (status = true) {
      this.form.disabled = status
      this.buttons.submit.loading = status
    }
  }
}
