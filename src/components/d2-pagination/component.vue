<template>
  <el-pagination
    @size-change="onSizeChange"
    @current-change="onCurrentChange"
    :current-page="current"
    :page-size="size"
    :total="total"
    :pager-count="5"
    :page-sizes="[100, 200, 300, 400]"
    layout="total, sizes, prev, pager, next, jumper"
    background>
  </el-pagination>
</template>

<script>
export default {
  name: 'd2-pagination',
  props: {
    current: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onSizeChange () {
      this.$emit('change')
    },
    onCurrentChange () {
      this.$emit('change')
    }
  }
}
</script>
