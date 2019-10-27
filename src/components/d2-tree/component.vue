<style lang="scss">
.d2-tree {
  &.el-tree--highlight-current {
    .el-tree-node.is-current>.el-tree-node__content {
      border-radius: 2px;
      background-color: $color-primary;
      color: #FFF;
    }
  }
}
</style>

<script>
import { isArray, isFunction } from 'lodash'

export default {
  name: 'd2-tree',
  render () {
    const component =
      <el-tree
        class="d2-tree"
        ref="tree" { ...{ attrs: this.config } }
        on-current-change={ this.onCurrentChange }
        on-check={ this.onCheck }>
      </el-tree>
    return component
  },
  props: {
    // 选中或者勾选的值
    value: { type: [ Number, Array ], default: 0, required: false },
    // 数据源方法
    // 可以直接传递数组为树的数据
    // 如果传递函数，该方法需要返回 promise<Array>
    source: {
      type: [ Function, Array ],
      default: () => [],
      required: false
    },
    // 是否多选
    multiple: { type: Boolean, default: false, required: false }
  },
  data () {
    return {
      currentData: [],
      currentNodeKey: 0,
      defaultCheckedKeys: []
    }
  },
  computed: {
    config () {
      return {
        data: this.currentData,
        ...this.$attrs,
        ...this.multiple ? {
          showCheckbox: true,
          defaultCheckedKeys: this.defaultCheckedKeys
        } : {
          currentNodeKey: this.currentNodeKey
        }
      }
    }
  },
  watch: {
    value: 'updateDefaultValue',
    source: 'init',
    multiple: 'init'
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      if (isArray(this.source)) {
        this.currentData = this.source
      } else if (isFunction(this.source)) {
        try {
          this.currentData = await this.source()
        } catch (error) {
          this.currentData = []
        }
      }
      this.updateDefaultValue()
    },
    updateDefaultValue () {
      if (this.multiple) this.defaultCheckedKeys = this.value
      else this.currentNodeKey = this.value
      if (!this.$refs.tree) return
      this.$nextTick(() => {
        if (this.multiple) this.$refs.tree.setCheckedKeys(this.defaultCheckedKeys)
        else this.$refs.tree.setCurrentKey(this.currentNodeKey)
      })
    },
    onCurrentChange (data, node) {
      if (this.multiple) return
      this.$emit('input', data.id)
    },
    onCheck (data, info) {
      if (!this.multiple) return
      this.$emit('input', info.checkedKeys)
    }
  }
}
</script>
