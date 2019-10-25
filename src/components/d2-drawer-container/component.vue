<style lang="scss" scoped>
.d2-drawer-container {
  @extend %full;
  .d2-drawer-container--body {
    padding: 0px 20px;
  }
  .d2-drawer-container--footer {
    padding: 20px;
  }
}
</style>

<template>
  <div class="d2-drawer-container" flex="dir:top main:justify box:last">
    <div class="d2-drawer-container--body">
      <d2-scrollbar style="height:100%;">
        <slot></slot>
      </d2-scrollbar>
    </div>
    <div class="d2-drawer-container--footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'd2-drawer-container'
}
</script>
