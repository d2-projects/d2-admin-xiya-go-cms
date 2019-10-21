<template>
  <span>
    <el-button @click="init">select menu</el-button>
    <el-dialog v-bind="dialogComputed" @close="onDialogClose">
      <el-tree v-bind="tree" :load="loadData" ref="tree">
        <div
          slot-scope="{ node }"
          flex="main:justify cross:center"
          style="flex:1">
          <span>{{ node.label }}</span>
          <d2-icon v-if="node.isCurrent" name="check"/>
        </div>
      </el-tree>
      <div slot="footer">
        <el-button @click="onOk">确定</el-button>
      </div>
    </el-dialog>
  </span>
</template>

<script>
export default {
  name: 'd2-select-menu',
  props: {
    check: {
      type: Boolean,
      default: false,
      required: false
    },
    value: {
      type: Number,
      default: 0,
      required: false
    }
  },
  data () {
    return {
      // dialog 设置 | 最后赋值的是 dialogComputed
      dialog: {
        visible: false
      }
    }
  },
  computed: {
    // dialog 设置项
    dialogComputed () {
      return {
        visible: this.dialog.visible,
        title: '选择菜单',
        width: '400px',
        appendToBody: true,
        closeOnClickModal: false
      }
    },
    // tree 设置项
    tree () {
      return {
        props: {
          label: 'menu_name'
        },
        lazy: true,
        nodeKey: 'id',
        // 选择
        currentNodeKey: this.value,
        // 勾选
        // checkStrictly: true,
        // showCheckbox: true,
        // defaultCheckedKeys: [ this.value ]
      }
    }
  },
  methods: {
    /**
     * 初始化
     */ 
    init () {
      this.dialog.visible = true
    },
    /**
     * 触发关闭面板
     */
    onDialogClose () {
      this.dialog.visible = false
    },
    /**
     * 加载数据
     */
    loadData (node, resolve) {
      console.log(node)
      this.$api.MENU_FIND({ parent: node.data ? node.data.id : 0 })
        .then(result => resolve(result))
        .catch(error => {})
    },
    /**
     * 确定
     */
    onOk () {
      const key = this.$refs.tree.getCurrentKey()
      this.$emit('input', key)
    }
  }
}
</script>
