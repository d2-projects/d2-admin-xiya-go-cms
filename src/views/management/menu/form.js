import { cloneDeep } from 'lodash'

const formValueDefault = {
  menu_name: '', // 菜单名称
  parent_id: 0, // 上级菜单
  order_num: 0, // 显示排序
  url: '/', // 请求地址
  menu_type: 1, // 菜单类型
  visible: 1, // 菜单状态
  perms: '', // 权限标识
  icon: 'file', // 图标
  remark: '无' // 备注
}

export default {
  render () {
    return <el-dialog
      visible={ this.dialog.visible }
      title={ this.title }
      show-close={ false }
      width="400px"
      destroy-on-close
      append-to-body
      on-close={ () => { this.dialog.visible = false } }>
      <el-form
        label-width="100px"
        model={ this.form }
        rules={ this.rules }
        on-input={ () => {} }
        ref="form">
        <el-form-item label="菜单名称" prop="menu_name">
          <el-input vModel={ this.form.menu_name }/>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parent_id">
          <d2-select-tree-menu-dialog vModel={ this.form.parent_id }/>
        </el-form-item>
        <el-form-item label="显示排序" prop="order_num">
          <el-input-number min={ 1 } vModel={ this.form.order_num }/>
        </el-form-item>
        <el-form-item label="请求地址" prop="url">
          <el-input vModel={ this.form.url }/>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menu_type">
          <d2-select-dict name="menu_type" vModel={ this.form.menu_type }/>
        </el-form-item>
        <el-form-item label="菜单状态" prop="visible">
          <d2-select-dict name="visible" vModel={ this.form.visible }/>
        </el-form-item>
        <el-form-item label="权限标识" prop="perms">
          <el-input vModel={ this.form.perms }/>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <d2-icon-select vModel={ this.form.icon }/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input vModel={ this.form.remark }/>
        </el-form-item>
        <el-form-item>
          <el-button on-click={ () => { this.dialog.visible = false } }>取消</el-button>
          <el-button type="primary" on-click={ this.onClickOk }><d2-icon name="check"/> 保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  },
  data () {
    return {
      // dialog 设置
      dialog: {
        visible: false
      },
      // 表单数据
      form: {},
      // 校验规则
      rules: {},
      // 模式设置
      mode: ''
    }
  },
  computed: {
    title () {
      let title = ''
      if (this.mode === 'edit') title = '菜单编辑'
      if (this.mode === 'create') title = '新建菜单'
      return title
    }
  },
  methods: {
    /**
     * @description 初始化
     */
    init ({ data = {}, mode = 'edit' } = {}) {
      if (mode === 'edit') {
        this.form = cloneDeep(data)
      } else if (mode === 'create') {
        this.form = Object.assign(cloneDeep(formValueDefault), data)
      }
      this.mode = mode
      this.dialog.visible = true
    },
    /**
     * @description 点击确定
     */
    async onClickOk () {
      if (this.mode === 'create') {
        await this.$api.MENU_CREATE(this.form)
        this.$message({ message: '创建成功', type: 'success' })
        this.dialog.visible = false
        this.$emit('success')
      }
      if (this.mode === 'edit') {
        await this.$api.MENU_UPDATE(this.form)
        this.$message({ message: '修改成功', type: 'success' })
        this.dialog.visible = false
        this.$emit('success')
      }
    }
  }
}
