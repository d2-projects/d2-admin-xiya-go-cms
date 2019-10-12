<style lang="scss" scoped>
.d2-api-base-url-controller {
  .el-dialog__body {
    .item {
      &:last-child {
        .el-button {
          margin-bottom: 0px;
        }
      }
      .el-button {
        margin-bottom: 10px;
        .item-name {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 4px;
        }
        .item-value {
          font-size: 12px;
        }
        .item-icon {
          font-size: 24px;
        }
      }
    }
  }
}
</style>

<template>
  <span>
    <el-dialog
      title="切换环境"
      :visible.sync="active"
      width="300px"
      custom-class="d2-api-base-url-controller"
      append-to-body>
      <div
        v-for="option of optionsEnv"
        :key="option.value"
        class="item">
        <el-button
          :type="isItemActive(option.value) ? 'primary' : 'default'"
          style="width: 100%;"
          @click="onSelect(option.value)">
          <div flex="main:justify cross:center">
            <div flex="dir:top cross:top">
              <div class="item-name">
                {{option.name}}
              </div>
              <div class="item-value">
                {{option.value}}
              </div>
            </div>
            <d2-icon
              v-if="isItemActive(option.value)"
              class="item-icon"
              name="check-circle"/>
          </div>
        </el-button>
      </div>
    </el-dialog>
    <span @click="onOpen">
      <slot/>
    </span>
  </span>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'd2-api-base-url-controller',
  data () {
    return {
      active: false
    }
  },
  computed: {
    ...mapState('d2admin/api', [
      'base',
      'optionsEnv'
    ])
  },
  methods: {
    ...mapMutations('d2admin/api', {
      baseUrlSet: 'set'
    }),
    onOpen () {
      this.active = true
    },
    onClose () {
      this.active = false
    },
    onSelect (value) {
      this.baseUrlSet(value)
      setTimeout(this.onClose, 300)
    },
    isItemActive (value) {
      return this.base === value
    }
  }
}
</script>
