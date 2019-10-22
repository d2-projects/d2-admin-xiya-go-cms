<template>
  <span>
    <el-button @click="onClickTrigger">选择</el-button>
    <el-dialog
      title="菜单选择"
      :visible.sync="dialog.visible"
      :show-close="false"
      width="300px"
      destroy-on-close
      append-to-body
      @close="onDialogClose">
      <d2-tree-select-menu
        v-if="dialog.visible"
        ref="tree"
        v-model="currentValue"/>
      <span slot="footer">
        <el-button @click="onClickCancle">取消</el-button>
        <el-button type="primary" @click="onClickOk">
          <d2-icon name="check"/>
          确定
        </el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
export default {
  name: 'd2-tree-select-menu-dialog',
  props: {
    value: {
      type: Number,
      default: 0,
      required: false
    }
  },
  data () {
    return {
      dialog: {
        visible: false
      },
      currentValue: 0
    }
  },
  watch: {
    value: {
      handler (value) {
        this.currentValue = value
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 点击触发器
     */
    onClickTrigger () {
      this.dialog.visible = true
    },
    /**
     * 点击取消
     */
    onClickCancle () {
      this.currentValue = this.value
      this.dialog.visible = false
    },
    /**
     * 点击确定
     */
    onClickOk () {
      this.$emit('input', this.currentValue)
      this.dialog.visible = false
    },
    /**
     * 面板关闭回调
     */
    onDialogClose () {
      this.currentValue = this.value
    }
  }
}
</script>
