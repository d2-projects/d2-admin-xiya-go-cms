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
import treeMixin from '../_mixins/tree'

export default {
  name: 'd2-tree',
  mixins: [
    treeMixin
  ],
  data () {
    return {
      currentData: [],
      currentNodeKey: 0,
      defaultCheckedKeys: []
    }
  },
  computed: {
    configFromProps () {
      return {
        nodeKey: this.keyId,
        props: {
          label: this.keyLabel,
          children: this.keyChildren
        }
      }
    },
    config () {
      return Object.assign({}, this.configFromProps, {
        data: this.currentData,
        ...this.$attrs,
        ...this.multiple ? {
          showCheckbox: true,
          defaultCheckedKeys: this.defaultCheckedKeys
        } : {
          highlightCurrent: true,
          currentNodeKey: this.currentNodeKey
        }
      })
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
      const data = await this.getDataFromSource(this.source)
      this.currentData = data
      this.getSourceFlat(data)
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
        if (this.multiple) {
          this.$refs.tree.setCheckedKeys(this.defaultCheckedKeys)
        } else {
          const isKeyInData = this.sourceFlat.find(item => item[this.keyId] === this.currentNodeKey)
          this.$refs.tree.setCurrentKey(isKeyInData ? this.currentNodeKey : null)
        }
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
