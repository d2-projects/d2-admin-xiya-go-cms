<style lang="scss" scoped>
.d2-api-base-url-controller {
  .el-dialog__body {
    .wrapper {
      max-height: 220px;
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
      <el-scrollbar>
        <div class="wrapper">
          <div
            v-for="option of options"
            :key="option.value"
            class="item">
            <d2-button
              size="default"
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
                <span v-if="isItemActive(option.value)">
                  <d2-icon class="item-icon" name="check-circle"/>
                </span>
                <span
                  v-else-if="option.type === 'custom'"
                  @click.stop="onRemove(option.value)">
                  <d2-icon class="item-icon" name="close"/>
                </span>
              </div>
            </d2-button>
          </div>
        </div>
      </el-scrollbar>
      <el-divider>或者</el-divider>
      <div flex="main:justify cross:center">
        <el-input
          size="default"
          v-model="custom"
          class="d2-mr-5"/>
        <d2-button
          size="default"
          :disabled="custom.length === 0"
          label="好"
          @click="onSelect(custom)"/>
      </div>
      <el-divider/>
      <d2-button
        size="default"
        type="primary"
        style="width:100%;"
        label="确定"
        @click="onClose"/>
    </el-dialog>
    <span @click="onOpen">
      <slot/>
    </span>
  </span>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'd2-api-base-url-controller',
  data () {
    return {
      active: false,
      custom: 'http://127.0.0.1:8080'
    }
  },
  computed: {
    ...mapState('d2admin/api', [
      'base'
    ]),
    ...mapGetters('d2admin/api', [
      'options'
    ])
  },
  methods: {
    ...mapActions('d2admin/api', {
      baseUrlSet: 'set',
      baseUrlOptionRemove: 'remove'
    }),
    onOpen () {
      this.active = true
    },
    onClose () {
      this.active = false
    },
    onSelect (value) {
      this.baseUrlSet(value)
    },
    onRemove (value) {
      this.baseUrlOptionRemove(value)
    },
    isItemActive (value) {
      return this.base === value
    }
  }
}
</script>
