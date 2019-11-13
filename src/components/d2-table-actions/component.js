export default {
  name: 'd2-table-actions',
  render () {
    const render =
      <span>
        {
          this.actions.map(
            action => {
              const attrsDefault = {
                plain: true
              }
              const attrs = this._.omit(action, [
                'action'
              ])
              const button =
                <d2-button
                  { ...{ attrs: Object.assign({}, attrsDefault, attrs) } }
                  class="is-thin"
                  on-click={ () => this.onAction(action) }
                />
              return button
            }
          )
        }
      </span>
    return render
  },
  props: {
    actions: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  methods: {
    onAction (action) {
      const callback = action.action || (() => {})
      if (action.confirm) {
        this.$confirm(action.confirm, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(callback)
          .catch(() => {})
      } else {
        callback()
      }
    }
  }
}
