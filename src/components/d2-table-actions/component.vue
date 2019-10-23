<style lang="scss">
.d2-table-actions {
  .el-button {
    +.el-button {
      margin-left: 4px;
    }
    // 注意 这里只适配了 mini 尺寸
    &.el-button--mini {
      &.is-only-icon {
        padding-left: 8px;
        padding-right: 8px;
      }
    }
  }
}
</style>

<script>
import { omit } from 'lodash'

export default {
  name: 'd2-table-actions',
  render () {
    const render =
      <span class="d2-table-actions">
        {
          this.actions.map(
            action => {
              const attrsDefault = {
                plain: true
              }
              const isOnlyIcon = action.icon && !action.label
              const attrs = omit(action, [
                'action'
              ])
              const button =
                <el-button
                  { ...{ attrs: Object.assign({}, attrsDefault, action) } }
                  class={ isOnlyIcon ? 'is-only-icon' : '' }
                  on-click={ () => this.onAction(action) }>
                  { action.label }
                </el-button>
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
</script>
