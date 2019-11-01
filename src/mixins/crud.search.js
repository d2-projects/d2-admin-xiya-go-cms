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
    vNodeFormItemvNodeButtonSearch () {
      return <el-form-item label="操作">{ this.vNodeButtonSearch }</el-form-item>
    },
    vNodeButtonSearch () {
      return <d2-button icon="el-icon-search" label="搜索" type="primary" on-click={ this.reload || function () {} } thin/>
    },
    vNodeButtonRefresh () {
      return <d2-button icon="el-icon-refresh" label="刷新" on-click={ this.reload || function () {} }/>
    }
  }
}
