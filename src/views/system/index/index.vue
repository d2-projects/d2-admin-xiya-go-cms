<template>
  <d2-container>
    <d2-fork-me-on-github/>
    <el-row>
      <el-col :span="12">
        <p>需要某项权限</p>
        <el-button v-permission="'system:user:remove'">v-permission="'system:user:remove'"</el-button>
        <p>需要至少一项权限</p>
        <el-button v-permission="['system:user:remove', 'system:user:edit']">v-permission="['system:user:remove', 'system:user:edit']"</el-button>
        <p>需要列表中全部权限</p>
        <el-button v-permission.all="['system:user:remove', 'system:user:edit']">v-permission.all="['system:user:remove', 'system:user:edit']"</el-button>
      </el-col>
      <el-col :span="12">
        <p>不允许某项权限</p>
        <el-button v-permission.not="'system:user:remove'">v-permission.not="'system:user:remove'"</el-button>
        <p>不允许其中任意一项权限</p>
        <el-button v-permission.not="['system:user:remove', 'system:user:edit']">v-permission.not="['system:user:remove', 'system:user:edit']"</el-button>
        <p>至少不包含列表中一项权限</p>
        <el-button v-permission.not.all="['system:user:remove', 'system:user:edit']">v-permission.not.all="['system:user:remove', 'system:user:edit']"</el-button>
      </el-col>
    </el-row>
  </d2-container>
</template>
