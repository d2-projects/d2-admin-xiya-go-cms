<style lang="scss" scoped>
.d2-table-columns-filter {
  .component--list {
    margin: -20px;
    background-color: $color-border-3;
    .component--list-item {
      padding: 10px;
      background-color: #FFF;
      margin-bottom: 1px;
      &.ghost {
        background-color: $color-border-3;
        opacity: .5;
      }
      &:last-child {
        margin-bottom: 0px;
      }
      .component--list-item-handle {
        margin: -10px;
        padding: 10px;
        color: $color-text-placehoder;
        @extend %unable-select;
        cursor: move;
        &.disabled {
          opacity: .3;
          cursor: pointer;
        }
      }
      &:hover {
        .component--list-item-handle {
          &:not(.disabled) {
            color: $color-text-normal;
          }
        }
      }
    }
  }
}
</style>

<template>
  <el-drawer
    title="列设置"
    :visible.sync="active"
    size="300px"
    append-to-body>
    <d2-drawer-container class="d2-table-columns-filter">
      <!-- 全选 反选 -->
      <div flex="main:justify cross:center">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="onCheckAllChange">
          {{ showLength }} / {{ options.length }}
        </el-checkbox>
        <el-tag>Fixed</el-tag>
      </div>
      <el-divider class="el-divider--mini"/>
      <el-card shadow="never">
        <draggable
          ghost-class="ghost"
          class="component--list"
          handle=".handle"
          v-model="currentValue">
          <transition-group>
            <div
              v-for="(option, index) of currentValue"
              :key="option.id"
              class="component--list-item"
              flex="main:justify cross:center">
              <el-checkbox flex-box="1" v-model="currentValue[index].show">
                {{ option.label || option.prop || '未命名' }}
              </el-checkbox>
              <d2-table-columns-fixed-controller
                flex-box="0"
                class="d2-mr-10"
                v-model="currentValue[index].fixed"
                @change="value => fixedChange(index, value)"/>
              <div
                flex-box="0"
                class="component--list-item-handle handle">
                <d2-icon name="bars"/>
              </div>
            </div>
          </transition-group>
        </draggable>
      </el-card>
      <el-row slot="footer" :gutter="10">
        <el-col :span="12">
          <d2-button
            size="default"
            icon="el-icon-refresh"
            label="还原"
            block
            @click="reset"/>
        </el-col>
        <el-col :span="12">
          <d2-button
            size="default"
            type="primary"
            icon="el-icon-check"
            label="确定"
            block
            @click="submit"/>
        </el-col>
      </el-row>
    </d2-drawer-container>
  </el-drawer>
</template>

<script>
import draggable from 'vuedraggable'

// 输入 全部分表格列设置
// 输出 要显示的表格列 + 每列的设置

export default {
  name: 'd2-table-columns-filter',
  components: {
    draggable
  },
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
      active: false,
      checkAll: false
    }
  },
  computed: {
    // 显示的数量
    showLength () {
      return this.currentValue.filter(e => e.show).length
    },
    // 半选状态
    isIndeterminate () {
      const optionsLength = this.options.length
      let result = this.showLength > 0 && optionsLength !== this.showLength
      return result
    }
  },
  watch: {
    options () {
      this.refresh()
    },
    value () {
      this.refresh()
    },
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
    // fixed 变化时触发
    fixedChange (index, value) {
      if (value) this.currentValue[index].show = true
      if (value === 'left') this.currentValue.unshift(this.currentValue.splice(index, 1)[0])
      if (value === 'right') this.currentValue.push(this.currentValue.splice(index, 1)[0])
    },
    // 全选和反选发生变化时触发
    onCheckAllChange (value) {
      this.currentValue = this.currentValue.map(e => {
        e.show = value
        return e
      })
    },
    // 根据 value 和 options 计算 currentValue
    // 规则
    // currentValue.length === options.length
    // value.length <= options.length
    refresh () {
      const options = this._.cloneDeep(this.options)
      const value = this._.cloneDeep(this.value)
      const currentValueOld = this._.cloneDeep(this.currentValue)
      let currentValue = []
      let checkAll = true
      // 设置比较源
      let compareSource = options
      if (currentValueOld.length > 0 && currentValueOld.length === options.length) {
        compareSource = currentValueOld
      }
      // 计算
      compareSource.forEach(option => {
        // 在 value 尝试找到这个项目
        // 没有的话使用 option 中的默认值
        let item = value.find(column => column.id === option.id)
        const show = !!item
        item = item || option
        item.show = show
        if (!show) checkAll = false
        currentValue.push(item)
      })
      this.currentValue = currentValue
      this.checkAll = checkAll
    },
    // 开始选择
    start () {
      this.active = true
    },
    // 还原
    reset () {
      this.currentValue = this._.cloneDeep(this.options).map(e => {
        e.show = e.show === false ? e.show : true
        return e
      })
      this.submit()
    },
    // 确认
    submit () {
      const result = []
      this.currentValue.forEach((item, index) => {
        if (item.show) {
          result.push(item)
        }
      })
      this.$emit('input', result)
      this.$emit('change', result)
      this.active = false
    }
  }
}
</script>
