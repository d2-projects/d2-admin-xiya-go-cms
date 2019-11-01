<style lang="scss">
.d2-search-panel {
  border-top: none;
  border-bottom: none;
  .el-collapse-item__header {
    border-bottom: none;
    height: auto;
    line-height: inherit;
  }
  .el-collapse-item__wrap {
    border-bottom: none;
  }
  .el-collapse-item__content {
    padding-bottom: 0px;
  }
  .d2-search-panel--title {
    flex-grow: 1;
    margin-right: 10px;
  }
  .d2-search-panel--content {
    margin-top: 10px;
  }
}
</style>

<template>
  <el-collapse :value="active" class="d2-search-panel">
    <el-collapse-item :name="name">
      <div slot="title" class="d2-search-panel--title" flex="box:first" @click.stop="onItemClick">
        <d2-button :icon="buttonIcon" :label="buttonLabel" @click="toggle" plain thin/>
        <slot name="title"/>
      </div>
      <div class="d2-search-panel--content">
        <slot/>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
const name = 'item'
export default {
  name: 'd2-search-panel',
  props: {
    value: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      name,
      active: ''
    }
  },
  watch: {
    value: {
      handler (value) {
        this.active = value ? this.name : ''
      },
      immediate: true
    }
  },
  computed: {
    buttonIcon () {
      return this.active === this.name ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
    },
    buttonLabel () {
      return this.active === this.name ? '隐藏搜索' : '展开搜索'
    }
  },
  methods: {
    onItemClick () {},
    toggle () {
      if (this.active) {
        this.active = ''
        this.$emit('input', false)
      } else {
        this.active = this.name
        this.$emit('input', true)
      }
    }
  }
}
</script>
