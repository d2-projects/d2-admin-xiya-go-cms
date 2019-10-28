<template>
  <el-popover v-bind="box" v-model="active">
    <el-card shadow="never" class="d2-mb-10">
      <d2-scrollbar style="height: 200px; margin: -10px;">
        <d2-tree
          v-bind="tree"
          :source="currentSource"
          :multiple="multiple"
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
import { cloneDeep } from 'lodash'
import treeMixin from '../_mixins/tree'

export default {
  name: 'd2-tree-popover',
  mixins: [
    treeMixin
  ],
  props: {
    tree: { type: Object, default: () => ({}), required: false }
  },
  data () {
    return {
      active: false,
      currentValue: 0,
      currentSource: [],
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
    }
  },
  created () {
    this.getTreeData()
  },
  watch: {
    value: {
      handler (value) {
        this.currentValue = cloneDeep(this.value)
        this.getLabel(this.currentValue)
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
      this.currentSource = await this.getDataFromSource(this.source)
      this.getSourceFlat(this.currentSource)
      this.getLabel(this.value)
    },
    /**
     * @description 取消
     */
    cancle () {
      this.currentValue = cloneDeep(this.value)
      this.active = false
    },
    /**
     * @description 确认
     */
    submit () {
      this.$emit('input', this.currentValue)
      this.active = false
    }
  }
}
</script>
