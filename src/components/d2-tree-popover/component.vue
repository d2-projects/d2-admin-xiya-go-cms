<template>
  <el-popover v-bind="box" v-model="active">
    <el-card shadow="never" class="d2-mb-10">
      <d2-scrollbar style="height: 200px; margin: -10px;">
        <d2-tree v-bind="tree" v-model="currentValue"/>
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
    <d2-button slot="reference" label="选择"/>
  </el-popover>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  name: 'd2-tree-popover',
  props: {
    value: { type: Number, default: 0, required: false },
    tree: { type: Object, default: () => ({}), required: false }
  },
  data () {
    return {
      active: false,
      currentValue: 0,
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
    }
  },
  watch: {
    value: {
      handler (value) {
        this.currentValue = cloneDeep(this.value)
      },
      immediate: true
    }
  },
  methods: {
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
