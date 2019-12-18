<template>
  <el-dropdown size="default" class="d2-mr">
    <span class="btn-text">{{name ? `你好 ${name}` : '用户中心'}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5"/>
        注销
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters('d2admin/user', [
      'name'
    ])
  },
  methods: {
    ...mapActions('d2admin/user', [
      'logout'
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.logout()
    }
  }
}
</script>
