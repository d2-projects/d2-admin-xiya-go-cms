<template>
  <el-select
    :value="value"
    placeholder="请选择"
    @change="onChange">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import dict from '@/mixins/component.dict'

export default {
  name: 'd2-dict-select',
  mixins: [ dict ]
}
</script>
