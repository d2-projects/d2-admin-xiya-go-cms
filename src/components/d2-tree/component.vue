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

<template>
  <el-tree
    class="d2-tree"
    ref="tree"
    v-bind="config"
    @current-change="currentChange"
    @check="check">
  </el-tree>
</template>

<script>
import { isArray, isString, isFunction } from 'lodash'

export default {
  name: 'd2-tree',
  props: {
    // 选中或者勾选的值
    value: { type: [ Number, Array ], default: 0, required: false },
    // 数据源方法
    // 可以直接传递数组为树的数据
    // 如果传递函数，该方法需要返回 promise<Array>
    source: {
      type: [ Function, Array, String ],
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
          highlightCurrent: true,
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
    /**
     * @description 初始化 根据 source 的数据类型设置数据
     */
    async init () {
      if (isArray(this.source)) {
        this.currentData = this.source
      } else if (isString(this.source) && isFunction(this.$api[this.source])) {
        try { this.currentData = await this.$api[this.source]() }
        catch (error) { this.currentData = [] }
      } else if (isFunction(this.source)) {
        try { this.currentData = await this.source() }
        catch (error) { this.currentData = [] }
      }
      this.updateDefaultValue()
    },
    /**
     * @description 将默认选择的值设置到树上
     */
    updateDefaultValue () {
      if (this.multiple) this.defaultCheckedKeys = this.value
      else this.currentNodeKey = this.value
      if (!this.$refs.tree) return
      this.$nextTick(() => {
        if (this.multiple) this.$refs.tree.setCheckedKeys(this.defaultCheckedKeys)
        else this.$refs.tree.setCurrentKey(this.currentNodeKey)
      })
    },
    /**
     * @description el-tree 事件 | current-change
     * @description 其它事件的转发请自行按需追加
     */
    currentChange (data, node) {
      this.$emit('current-change', data, node)
      // 更新 value
      if (this.multiple) return
      this.$emit('input', data.id)
    },
    /**
     * @description el-tree 事件 | check
     * @description 其它事件的转发请自行按需追加
     */
    check (data, info) {
      this.$emit('check', data, info)
      // 更新 value
      if (!this.multiple) return
      this.$emit('input', info.checkedKeys)
    }
  }
}
</script>
