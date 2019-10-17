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
            default: scope => createElement('d2-render', {
              props: {
                row: scope.row,
                column: scope.column,
                index: scope.$index,
                render: column.render
              }
            })
          }
        } : {}
      })
    }))
  }
}
