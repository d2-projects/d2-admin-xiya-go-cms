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
import tree from '@/mixins/component.tree'
import fieldChange from '@/mixins/el.fieldChange'

export default {
  name: 'd2-tree',
  render () {
    const component =
      <el-tree
        class="d2-tree"
        ref="tree"
        { ...{ attrs: this.config } }
        on-current-change={ this.currentChange }
        on-check={ this.check }>
      </el-tree>
    return component
  },
  mixins: [
    tree,
    fieldChange
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
     * @description 删除 half 状态的数据
     */
    removeHalf (sourceArray) {
      if (!this.halfMix) return sourceArray
      /**
       * 找到这个值在 tree 中的对应并且判断是否子集都选中
       * 如果没有找到 返回 false
       * 如果找到了 并且子集都选中 返回 false
       * 如果找到了 子集没有都选中 返回 true
       */
      const isHalf = value => {
        let node = {}
        let half = false
        const find = treeArray => {
          for (let index = 0; index < treeArray.length; index++) {
            const element = treeArray[index]
            if (element[this.keyId] === value) {
              node = element
              break
            } else {
              find(element[this.keyChildren])
            }
          }
        }
        find(this.currentData)
        const children = node[this.keyChildren] || []
        for (let index = 0; index < children.length; index++) {
          const element = children[index]
          if (sourceArray.findIndex(e => e === element[this.keyId]) < 0) {
            half = true
            break
          }
        }
        return half
      }
      return sourceArray.filter(e => !isHalf(e))
    },
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
      // 根据是否多选 分别设置 tree 的属性
      if (this.multiple) {
        this.defaultCheckedKeys = this.removeHalf(this.tryParseMultipleString(this.value))
      } else {
        this.currentNodeKey = this.value
      }
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
      this.$emit('change', data.id)
      this.fieldChange()
    },
    /**
     * @description el-tree 事件 | check
     * @description 其它事件的转发请自行按需追加
     */
    check (data, info) {
      this.$emit('check', data, info)
      // 更新 value
      if (!this.multiple) return
      const value = this._.concat(info.checkedKeys, this.halfMix ? info.halfCheckedKeys : [])
      this.$emit('input', this.tryStringify(value))
      this.$emit('change', this.tryStringify(value))
      this.fieldChange()
    }
  }
}
</script>
