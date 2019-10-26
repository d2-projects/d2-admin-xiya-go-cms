<template>
  <el-drawer
    title="列设置"
    :visible.sync="active"
    size="250px"
    append-to-body>
    <d2-drawer-container>
      <!-- 全选 反选 -->
      <div flex="main:justify cross:center">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="onCheckAllChange">
          {{ showLength }} / {{ options.length }}
        </el-checkbox>
        <el-tag class="d2-mr-20">Fixed</el-tag>
      </div>
      <!-- 分割线 -->
      <el-divider class="el-divider--mini"/>
      <!-- 循环列 -->
      <div
        v-for="(option, index) of options"
        :key="option.prop"
        flex="main:justify cross:center">
        <el-checkbox v-model="isShow[index]">
          {{ option.label || option.prop || '未命名' }}
        </el-checkbox>
        <d2-table-columns-fixed-controller
          v-model="currentValue[index].fixed"
          class="d2-mr-20"/>
      </div>
      <!-- 确定按钮 -->
      <d2-button
        slot="footer"
        size="default"
        type="primary"
        icon="el-icon-check"
        label="确定"
        :disabled="currentValue.length === 0"
        block
        @click="submit"/>
    </d2-drawer-container>
  </el-drawer>
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
      active: false,
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
    active (value) {
      if (value === false) {
        this.refresh()
      }
    }
  },
  created () {
    this.refresh()
  },
  methods: {
    // 全选和反选发生变化时触发
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
    // 开始选择
    start () {
      this.active = true
    },
    // 确认
    submit () {
      const result = []
      this.isShow.forEach((show, index) => {
        if (show) {
          result.push(this.currentValue[index])
        }
      })
      this.$emit('input', result)
      this.$emit('change', result)
      this.active = false
    }
  }
}
</script>
