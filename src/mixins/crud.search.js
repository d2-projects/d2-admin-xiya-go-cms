export default {
  data () {
    return {
      search: {
        panel: {
          active: true
        },
        form: {
          model: {},
          inline: true,
          labelPosition: 'top'
        }
      }
    }
  },
  computed: {
    formItemButtonSearch () {
      return <el-form-item label="操作">{ this.buttonSearch }</el-form-item>
    },
    buttonSearch () {
      return <d2-button icon="el-icon-search" label="搜索" type="primary" on-click={ this.reload } thin/>
    },
    buttonRefresh () {
      return <d2-button icon="el-icon-refresh" label="刷新" on-click={ this.reload }/>
    }
  }
}
