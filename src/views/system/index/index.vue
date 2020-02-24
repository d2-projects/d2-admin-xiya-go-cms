<template>
  <d2-container>
    <el-tabs v-model="active">
      <el-tab-pane label="权限指令" name="permission">
        <index-tab-permission/>
      </el-tab-pane>
      <el-tab-pane label="富文本编辑器" name="editor">
        <index-tab-editor/>
      </el-tab-pane>
    </el-tabs>
  </d2-container>
</template>

<script>
export default {
  components: {
    indexTabPermission: () => import('./components/permission'),
    indexTabEditor: () => import('./components/editor')
  },
  data () {
    return {
      active: 'permission'
    }
  }
}
</script>
