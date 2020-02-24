<template>
  <el-row>
    <el-col :span="12">
      <p>需要具有某项权限</p>
      <p>v-permission="'system:user:remove'"</p>
      <el-button v-permission="'system:user:remove'">Button</el-button>
      <p>需要具有至少一项权限</p>
      <p>v-permission="['system:user:remove', 'system:user:edit']"</p>
      <el-button v-permission="['system:user:remove', 'system:user:edit']">Button</el-button>
      <p>需要具有给出的全部权限</p>
      <p>v-permission.all="['system:user:remove', 'system:user:edit']"</p>
      <el-button v-permission.all="['system:user:remove', 'system:user:edit']">Button</el-button>
    </el-col>
    <el-col :span="12">
      <p>不允许具有某项权限</p>
      <p>v-permission.not="'system:user:remove'"</p>
      <el-button v-permission.not="'system:user:remove'">Button</el-button>
      <p>不允许具有其中任意一项权限</p>
      <p>v-permission.not="['system:user:remove', 'system:user:edit']"</p>
      <el-button v-permission.not="['system:user:remove', 'system:user:edit']">Button</el-button>
      <p>至少不具有其中一项权限</p>
      <p>v-permission.not.all="['system:user:remove', 'system:user:edit']"</p>
      <el-button v-permission.not.all="['system:user:remove', 'system:user:edit']">Button</el-button>
    </el-col>
  </el-row>
</template>
