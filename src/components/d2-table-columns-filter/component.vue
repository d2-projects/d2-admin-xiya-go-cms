<template>
  <el-popover v-model="popover" placement="bottom" width="150">
    <div v-for="(option, index) of options" :key="option.prop" flex="main:justify cross:center">
      <el-checkbox v-model="isShow[index]">
        {{ option.label || option.prop || '未命名' }}
      </el-checkbox>
      <span>{{ currentValue[index].fixed }}</span>
    </div>
    <el-divider class="el-divider--mini"/>
    <d2-button type="primary" icon="el-icon-check" label="确定" :disabled="currentValue.length === 0" block @click="onSubmit"/>
    <d2-button slot="reference" icon="el-icon-set-up"/>
  </el-popover>
</template>

<script>
import { cloneDeep } from 'lodash'

// 输入 全部分表格列设置
// 输出 要显示的表格列 + 每列的设置

export default {
  name: 'd2-table-columns-filter',
  props: {
    options: {
      type: Array,
      default: () => [],
      required: false
    },
    value: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  data () {
    return {
      currentValue: [],
      isShow: [],
      popover: false
    }
  },
  watch: {
    options: 'refresh',
    value: 'refresh',
    popover (value) {
      if (value === false) {
        this.refresh()
      }
    }
  },
  created () {
    this.refresh()
  },
  methods: {
    // 根据 value 和 options 计算 currentValue
    // 规则
    // currentValue.length === options.length
    // value.length <= options.length
    refresh () {
      const options = cloneDeep(this.options)
      const value = cloneDeep(this.value)
      let isShow = []
      this.currentValue = options.map(option => {
        const optionInValue = value.find(column => column.id === option.id)
        isShow.push(!!optionInValue)
        return optionInValue || option
      })
      this.isShow = isShow
    },
    onSubmit () {
      const result = []
      this.isShow.forEach((show, index) => {
        if (show) {
          result.push(this.currentValue[index])
        }
      })
      this.$emit('input', result)
      this.$emit('change', result)
      this.popover = false
    }
  }
}
</script>
