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
    return createElement('el-table', {
      props: {
        ...this.$attrs
      }
    }, this.columns.map(column => {
      return createElement('el-table-column', {
        props: {
          ...column
        },
        ...column.render ? {
          scopedSlots: {
            default: scope => column.render(createElement, {
              row: scope.row,
              column: scope.column,
              index: scope.$index
            })
          }
        } : {}
      })
    }))
  }
}
