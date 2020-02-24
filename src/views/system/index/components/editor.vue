<style lang="scss">
.index-tab-permission {
  .ql-container {
    height: 300px - 66px;
  }
  .el-textarea {
    &.is-disabled {
      textarea {
        font-weight: 500;
        color: #606266;
      }
    }
  }
}
</style>

<template>
  <div class="index-tab-permission">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-alert title="d2-quill" type="info" :closable="false" class="d2-mb-10"/>
        <d2-quill v-model="value"/>
      </el-col>
      <el-col :span="12">
        <el-alert title="v-model 绑定的值" type="info" :closable="false" class="d2-mb-10"/>
        <el-input type="textarea" :rows="16" :value="value" disabled/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'index-tab-permission',
  data () {
    return {
      value:`<p>
<a href="https://github.com/d2-projects/d2-admin" target="_blank" class="ql-size-large" style="color: rgb(65, 184, 131);"><strong>D2 Admin</strong></a>
<strong style="color: rgb(65, 184, 131);"></strong>
by
<a href="https://cn.vuejs.org/" target="_blank" class="ql-size-large" style="color: rgb(65, 184, 131);"><strong>vue.js</strong></a>
</p>`
    }
  }
}
</script>
