<template>
  <el-tree
    :props="props"
    :data="data"
    :current-node-key="currentNodeKey"
    node-key="id"
    ref="tree"
    default-expand-all
    @current-change="onCurrentChange">
    <div
      slot-scope="{ node }"
      flex="main:justify cross:center"
      :class="{
        'el-link': node.isCurrent,
        'el-link--primary': node.isCurrent
      }"
      style="flex:1">
      <span>{{ node.label }}</span>
      <d2-icon v-if="node.isCurrent" name="check-circle" class="d2-mr-10"/>
    </div>
  </el-tree>
</template>

<script>
export default {
  name: 'd2-select-tree-menu',
  props: {
    value: {
      type: Number,
      default: 0,
      required: false
    }
  },
  data () {
    return {
      props: {
        label: 'menu_name',
        children: 'children_list'
      },
      data: [],
      currentNodeKey: 0
    }
  },
  watch: {
    value () {
      this.$nextTick(() => this.$refs.tree && this.$refs.tree.setCurrentKey(this.value))
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.currentNodeKey = this.value
      this.data = await this.$api.MENU_ALL()
    },
    onCurrentChange (data, node) {
      this.$emit('input', data.id)
    }
  }
}
</script>
