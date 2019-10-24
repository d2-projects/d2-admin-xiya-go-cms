<template>
  <span>
    <d2-button label="选择" @click="onClickTrigger"/>
    <el-dialog
      title="菜单选择"
      :visible.sync="dialog.visible"
      :show-close="false"
      width="300px"
      destroy-on-close
      append-to-body
      @close="onDialogClose">
      <d2-select-tree-menu
        v-if="dialog.visible"
        v-model="currentValue"
        ref="tree"/>
      <span slot="footer">
        <d2-button @click="onClickCancle" label="取消" plain/>
        <d2-button type="primary" icon="el-icon-check" label="确定" @click="onClickOk"/>
      </span>
    </el-dialog>
  </span>
</template>

<script>
export default {
  name: 'd2-select-tree-menu-dialog',
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
