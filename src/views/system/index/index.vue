<template>
  <d2-container>
    <d2-fork-me-on-github/>
    <el-row>
      <el-col :span="6">
        <p>{{ value1 }}</p>
        <d2-tree v-bind="tree1" v-model="value1" :source="$api.MENU_ALL"/>
      </el-col>
      <el-col :span="6">
        <p>{{ value2 }}</p>
        <d2-tree v-bind="tree2" v-model="value2" :source="$api.MENU_ALL"/>
      </el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </d2-container>
</template>

<script>
export default {
  data () {
    return {
      value1: 81,
      tree1: {
        defaultExpandAll: true,
        nodeKey: 'id',
        keyLabel: 'menu_name'
      },
      value2: [ 86 ],
      tree2: {
        multiple: true,
        defaultExpandAll: true,
        nodeKey: 'id',
        keyLabel: 'menu_name'
      }
    }
  }
}
</script>
