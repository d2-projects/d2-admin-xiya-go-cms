<template>
  <el-card shadow="never" class="d2-card">
    <div :style="cardBodyStyle">
      <d2-scrollbar style="height: 100px;">
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
    height: { type: String, default: '', required: false },
    paddingTop: { type: Number, default: 10, required: false },
    paddingBottom: { type: Number, default: 10, required: false },
    paddingLeft: { type: Number, default: 10, required: false },
    paddingRight: { type: Number, default: scrollBarWidth, required: false }
  },
  computed: {
    cardBodyStyle () {
      return {
        marginTop: `${this.paddingTop - elCardPadding}px`,
        marginBottom: `${this.paddingBottom - elCardPadding}px`,
        marginLeft: `${this.paddingLeft - elCardPadding}px`,
        marginRight: `${this.paddingRight - elCardPadding - scrollBarPadding}px`
      }
    },
    scrollInnerStyle () {
      return {
        marginRight: `${this.paddingRight + scrollBarWidth}px`
      }
    }
  }
}
</script>
