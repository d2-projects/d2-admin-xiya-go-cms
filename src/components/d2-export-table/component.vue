<template>
  <span @click="onTriggerClick">
    <slot/>
    <el-drawer
      title="数据导出"
      :visible.sync="drawer.visible">
      <span>doing</span>
    </el-drawer>
  </span>
</template>

<script>
export default {
  name: 'd2-export-table',
  data () {
    return {
      drawer: {
        visible: false
      }
    }
  },
  methods: {
    onTriggerClick () {
      this.drawerOpen()
    },
    drawerOpen () {
      this.drawer.visible = true
    }
  }
}
</script>
