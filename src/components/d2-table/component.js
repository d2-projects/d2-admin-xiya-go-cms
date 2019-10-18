export default {
  name: 'd2-table',
  props: {
    columns: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  render (createElement) {
    const propsDefault = {
      stripe: true,
      height: '100%'
    }
    return createElement('el-table', {
      props: Object.assign(propsDefault, this.$attrs),
      on: this.$listeners,
      directives: [
        // v-loading
        {
          name: 'loading',
          value: this.$attrs.loading || false
        }
      ]
    }, this.columns.map(column => {
      const scopedSlots = column.render ? {
        scopedSlots: {
          default: scope => column.render(createElement, {
            row: scope.row,
            column: scope.column,
            index: scope.$index
          })
        }
      } : null
      return createElement('el-table-column', {
        props: column,
        ...scopedSlots || {}
      })
    }))
  },
  methods: {
    // https://element.eleme.cn/#/zh-CN/component/table#table-methods
  }
}
