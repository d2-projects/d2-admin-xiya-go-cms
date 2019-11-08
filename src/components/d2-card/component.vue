<template>
  <el-card shadow="never" class="d2-card">
    <div :style="cardBodyStyle">
      <d2-scrollbar style="height: 300px;">
        <div :style="scrollInnerStyle">
          <slot></slot>
        </div>
      </d2-scrollbar>
    </div>
  </el-card>
</template>

<script>
const elCardPadding = 20
const scrollBarPadding = 2
const scrollBarWidth = 6
export default {
  name: 'd2-card',
  props: {
    height: { type: String, default: '', required: false }
  },
  computed: {
    cardBodyStyle () {
      return {
        marginTop: '-10px',
        marginBottom: '-10px',
        marginLeft: '-10px',
        marginRight: '-20px'
      }
    },
    scrollInnerStyle () {
      return {
        marginRight: '10px'
      }
    }
  }
}
</script>
