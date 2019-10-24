<template>
  <el-button v-bind="$attrs" class="d2-button" @click="$emit('click')">
    <d2-icon v-if="fa" :name="fa"/>
    <slot/>
  </el-button>
</template>

<script>
export default {
  name: 'd2-button',
  props: {
    fa: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>
