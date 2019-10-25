<template>
  <el-popover v-model="popover" placement="bottom" width="150">
    <!-- 全选 反选 -->
    <div>
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="onCheckAllChange">
        {{ showLength }} / {{ options.length }}
      </el-checkbox>
    </div>
    <!-- 分割线 -->
    <el-divider class="el-divider--mini"/>
    <!-- 循环列 -->
    <div v-for="(option, index) of options" :key="option.prop" flex="main:justify cross:center">
      <el-checkbox v-model="isShow[index]">
        {{ option.label || option.prop || '未命名' }}
      </el-checkbox>
      <span>{{ currentValue[index].fixed }}</span>
    </div>
    <!-- 分割线 -->
    <el-divider class="el-divider--mini"/>
    <!-- 确定按钮 -->
    <d2-button type="primary" icon="el-icon-check" label="确定" :disabled="currentValue.length === 0" block @click="submit"/>
    <!-- 触发按钮 -->
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
      popover: false,
      checkAll: false
    }
  },
  computed: {
    // 显示的数量
    showLength () {
      return this.isShow.filter(e => e).length
    },
    // 半选状态
    isIndeterminate () {
      const optionsLength = this.options.length
      let result = this.showLength > 0 && optionsLength !== this.showLength
      return result
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
    onCheckAllChange (value) {
      this.isShow = this.isShow.map(e => value)
    },
    // 根据 value 和 options 计算 currentValue
    // 规则
    // currentValue.length === options.length
    // value.length <= options.length
    refresh () {
      const options = cloneDeep(this.options)
      const value = cloneDeep(this.value)
      let isShow = []
      let currentValue = []
      let checkAll = true
      options.forEach(option => {
        // 在 value 尝试找到这个项目
        // 没有的话使用 option 中的默认值
        const item = value.find(column => column.id === option.id)
        const show = !!item
        if (!show) checkAll = false
        currentValue.push(item || option)
        isShow.push(show)
      })
      this.isShow = isShow
      this.currentValue = currentValue
      this.checkAll = checkAll
    },
    submit () {
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
