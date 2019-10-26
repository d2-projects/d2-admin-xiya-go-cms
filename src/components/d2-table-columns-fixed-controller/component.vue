<style lang="scss" scoped>
.d2-table-columns-fixed-controller {
  .d2-button {
    padding: 2px;
    font-size: 10px;
  }
  .d2-button+.d2-button {
    margin-left: 1px;
  }
}
</style>

<template>
  <div class="d2-table-columns-fixed-controller">
    <d2-button
      v-for="option of options"
      :key="option.icon"
      :type="value === option.value ? 'primary' : 'default'"
      :icon="option.icon"
      @click="$emit('input', option.value)"/>
  </div>
</template>

<script>
export default {
  name: 'd2-table-columns-fixed-controller',
  props: {
    value: {
      default: false
    }
  },
  data () {
    return {
      options: [
        {
          value: 'left',
          icon: 'el-icon-arrow-left'
        },
        {
          value: false,
          icon: 'el-icon-close'
        },
        {
          value: 'right',
          icon: 'el-icon-arrow-right'
        },
      ]
    }
  }
}
</script>
