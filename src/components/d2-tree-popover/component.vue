<template>
  <el-popover v-bind="box" v-model="active" @show="onBoxShow" @after-leave="onBoxAfterLeave">
    <el-card shadow="never" class="d2-mb-10" v-loading="isTreeLoading">
      <d2-scrollbar style="height: 200px; margin: -10px;">
        <d2-tree
          v-bind="tree"
          :source="currentSource"
          :multiple="multiple"
          :halfMix="halfMix"
          :stringify="stringify"
          :keyId="keyId"
          :keyLabel="keyLabel"
          :keyChildren="keyChildren"
          v-model="currentValue"/>
      </d2-scrollbar>
    </el-card>
    <el-row :gutter="10">
      <el-col :span="12">
        <d2-button size="default" @click="cancle" label="取消" plain block/>
      </el-col>
      <el-col :span="12">
        <d2-button size="default" type="primary" icon="el-icon-check" label="确定" @click="submit" block/>
      </el-col>
    </el-row>
    <d2-button slot="reference" :label="title"/>
  </el-popover>
</template>

<script>
import tree from '@/mixins/component-tree'
import fieldChange from '@/mixins/el-field-change'

export default {
  name: 'd2-tree-popover',
  mixins: [
    tree,
    fieldChange
  ],
  props: {
    // 传递给 tree 组件的设置项
    tree: {
      type: Object,
      default: () => ({}),
      required: false
    },
    // 总是在打开时重新计算 source
    refreshOnOpen: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data () {
    return {
      active: false,
      currentValue: 0,
      currentSource: [],
      status: {
        isLoadingSource: false
      },
      boxSetting: {
        placement: 'top-start',
        title: '请选择',
        width: '230',
        trigger: 'click'
      }
    }
  },
  computed: {
    box () {
      return {
        ...this.boxSetting,
        ...this.$attrs
      }
    },
    title () {
      if (this.multiple) {
        return `已选择 ${this.valueLabels.length} 项`
      } else {
        return this.valueLabel || '未选择或未匹配'
      }
    },
    isTreeLoading () {
      return this.status.isLoadingSource
    }
  },
  created () {
    this.getTreeData()
  },
  watch: {
    value: {
      handler (value) {
        this.currentValue = this.tryParseMultipleString(this.value)
        this.getLabel(this.value)
      },
      immediate: true
    },
    source: 'getTreeData',
    multiple: 'getTreeData'
  },
  methods: {
    /**
     * @description 初始化
     * @description 根据 source 的数据类型设置数据
     * @description 并且计算扁平化数据优化后续计算速度
     * @description 计算一次初始的 valueLabel
     * @description 计算一次初始的 valueLabels
     */
    async getTreeData () {
      this.status.isLoadingSource = true
      this.currentSource = await this.getDataFromSource(this.source)
      this.refreshFlattenedArray(this.currentSource)
      this.refreshFlattenedObject(this.currentSource)
      this.getLabel(this.value)
      this.status.isLoadingSource = false
    },
    /**
     * @description 面板打开时候触发
     */
    onBoxShow () {
      if (!this.refreshOnOpen) return
      this.getTreeData()
    },
    /**
     * @description 面板关闭动画结束后触发
     */
    onBoxAfterLeave () {
      if (!this.refreshOnOpen) return
      this.currentSource = []
    },
    /**
     * @description 取消
     */
    cancle () {
      this.currentValue = this.tryParseMultipleString(this.value)
      this.active = false
    },
    /**
     * @description 确认
     */
    submit () {
      this.$emit('input', this.currentValue)
      this.fieldChange()
      this.active = false
    }
  }
}
</script>
