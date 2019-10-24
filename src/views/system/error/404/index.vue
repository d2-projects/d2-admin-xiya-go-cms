<template>
  <div class="page">
    <p class="page_title">404 page not found</p>
    <d2-button class="d2-mt" label="返回首页" @click="$router.replace({ path: '/' })"/>
  </div>
</template>

<style lang="scss" scoped>
.page {
  background: #303133;
  background-blend-mode: multiply,multiply;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .page_title {
    font-size: 20px;
    color: #FFF;
  }
}
</style>
