<template>
  <el-dialog v-bind="dialogComputed" @close="onDialogClose">
    <el-form v-bind="form" ref="form">
      <el-form-item label="菜单名称" prop="menu_name">
        <el-input v-model="form.model.menu_name"/>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parent_id">
        <d2-select-menu v-model="form.model.parent_id"/>
      </el-form-item>
      <el-form-item label="显示排序" prop="order_num">
        <el-input v-model="form.model.order_num"/>
      </el-form-item>
      <el-form-item label="请求地址" prop="url">
        <el-input v-model="form.model.url"/>
      </el-form-item>
      <el-form-item label="菜单类型" prop="menu_type">
        <el-input v-model="form.model.menu_type"/>
      </el-form-item>
      <el-form-item label="菜单状态" prop="menu_type">
        <el-input v-model="form.model.menu_type"/>
      </el-form-item>
      <el-form-item label="权限标识" prop="perms">
        <el-input v-model="form.model.perms"/>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="form.model.icon"/>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.model.remark"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          <d2-icon name="check"/>
          保存
        </el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { cloneDeep } from 'lodash'

const formValueDefault = {
  menu_name: '', // 菜单名称
  parent_id: 0, // 上级菜单
  order_num: 0, // 显示排序
  url: '', // 请求地址
  menu_type: 1, // 菜单类型（1,目录 2,菜单 3,按钮）
  visible: 1, // 菜单状态（1显示 2隐藏）
  perms: '', // 权限标识
  icon: '', // 图标
  remark: '' // 备注
}

export default {
  data () {
    return {
      // dialog 设置 | 最后赋值的是 dialogComputed
      dialog: {
        visible: false
      },
      // 表单数据和设置
      form: {
        model: {},
        rules: {},
        labelWidth: '100px'
      },
      // 模式设置
      mode: ''
    }
  },
  computed: {
    // dialog 设置项
    dialogComputed () {
      let title = ''
      if (this.mode === 'edit') title = '菜单编辑'
      if (this.mode === 'create') title = '新建菜单'
      return {
        visible: this.dialog.visible,
        title,
        width: '400px',
        appendToBody: true,
        closeOnClickModal: false
      }
    }
  },
  methods: {
    /**
     * 初始化
     */
    init ({
      // form data
      data = {},
      // edit or create
      mode = 'edit'
    } = {}) {
      if (mode === 'edit') {
        // 编辑模式
        this.form.model = cloneDeep(data)
      } else if (mode === 'create') {
        // 新建模式
        this.form.model = Object.assign(cloneDeep(formValueDefault), data)
      }
      // 设置模式
      this.mode = mode
      // 打开面板
      this.open()
    },
    /**
     * 开启面板
     */
    open () {
      this.dialog.visible = true
    },
    /**
     * 关闭面板
     */
    close () {
      this.dialog.visible = false
    },
    /**
     * 触发关闭面板
     */
    onDialogClose () {
      this.close()
    }
  }
}
</script>
