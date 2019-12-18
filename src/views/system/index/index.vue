<template>
  <d2-container>
    <d2-fork-me-on-github/>
  </d2-container>
</template>

<script>
export default {
  mounted () {
    this.$api.MENU_USER()
      .then(res => {
        console.log(res)
      })
  }
}
</script>