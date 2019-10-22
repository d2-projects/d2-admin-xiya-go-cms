<template>
  <el-dialog
    :visible.sync="dialog.visible"
    :title="title"
    :show-close="false"
    width="400px"
    destroy-on-close
    append-to-body>
    <el-form v-bind="form" ref="form">
      <el-form-item label="菜单名称" prop="menu_name">
        <el-input v-model="form.model.menu_name"/>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parent_id">
        <d2-select-tree-menu-dialog v-model="form.model.parent_id"/>
      </el-form-item>
      <el-form-item label="显示排序" prop="order_num">
        <el-input-number :min="1" v-model="form.model.order_num"/>
      </el-form-item>
      <el-form-item label="请求地址" prop="url">
        <el-input v-model="form.model.url"/>
      </el-form-item>
      <el-form-item label="菜单类型" prop="menu_type">
        <d2-select-dict name="menu_type" v-model="form.model.menu_type"/>
      </el-form-item>
      <el-form-item label="菜单状态" prop="visible">
        <d2-select-dict name="visible" v-model="form.model.visible"/>
      </el-form-item>
      <el-form-item label="权限标识" prop="perms">
        <el-input v-model="form.model.perms"/>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <d2-icon-select v-model="form.model.icon"/>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.model.remark"/>
      </el-form-item>
      <el-form-item>
        <el-button @click="onClickCancle">取消</el-button>
        <el-button type="primary" @click="onClickOk"><d2-icon name="check"/> 保存</el-button>
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
  url: '/', // 请求地址
  menu_type: 1, // 菜单类型
  visible: 1, // 菜单状态
  perms: '', // 权限标识
  icon: 'file', // 图标
  remark: '无' // 备注
}

export default {
  data () {
    return {
      // dialog 设置
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
        this.form.model = cloneDeep(data)
      } else if (mode === 'create') {
        this.form.model = Object.assign(cloneDeep(formValueDefault), data)
      }
      this.mode = mode
      this.dialog.visible = true
    },
    /**
     * 点击取消
     */
    onClickCancle () {
      // 关闭面板
      this.dialog.visible = false
    },
    /**
     * 点击确定
     */
    async onClickOk () {
      if (this.mode === 'create') {
        await this.$api.MENU_CREATE(this.form.model)
        this.$message({ message: '创建成功', type: 'success' })
        this.dialog.visible = false
        this.$emit('success')
      }
      if (this.mode === 'edit') {
        await this.$api.MENU_UPDATE(this.form.model)
        this.$message({ message: '修改成功', type: 'success' })
        this.dialog.visible = false
        this.$emit('success')
      }
    }
  }
}
</script>
