<style lang="scss">
.d2-avatar-uploader {
  &.is-empty {
    .el-upload {
      border-style: dashed;
    }
  }
  .el-upload {
    border-color: $color-border-1;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #C0C4CC;
    }
  }
  .icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
  }
  .avatar {
    display: block;
  }
}
</style>

<template>
  <el-upload
    class="d2-avatar-uploader"
    :class="{ 'is-empty': isEmpty }"
    :style="styleUploader"
    action="https://jsonplaceholder.typicode.com/posts/"
    :show-file-list="false"
    :before-upload="beforeUpload">
    <img
      v-if="currentValue"
      :src="currentValue"
      class="avatar"
      :style="styleAvatar">
    <i
      v-else
      class="el-icon-plus icon"
      :style="styleIcon"/>
  </el-upload>
</template>

<script>
import { vModelString } from '@/mixins/component.vmodel.js'
export default {
  name: 'd2-avatar-uploader',
  mixins: [
    vModelString()
  ],
  props: {
    width: { type: Number, default: 100, required: false },
    height: { type: Number, default: 100, required: false },
    limit: { type: Number, default: 1, required: false }
  },
  computed: {
    isEmpty () {
      return !this.currentValue
    },
    styleUploader () {
      return {
        height: this.height + 'px',
        width: this.width + 'px'
      }
    },
    styleAvatar () {
      return {
        height: this.height - 2 + 'px',
        width: this.width - 2 + 'px'
      }
    },
    styleIcon () {
      return {
        height: this.height - 2 + 'px',
        width: this.width - 2 + 'px',
        lineHeight: this.height - 2 + 'px'
      }
    }
  },
  methods: {
    checkLimit (file) {
      let result = true
      if (file.size > this.limit * 1024 * 1024) {
        this.$message.error(`头像图片大小不能超过${this.limit}MB`)
        result = false
      }
      return result
    },
    async beforeUpload(file) {
      if (!this.checkLimit(file)) return
      const path = await this.$api.UPLOAD_IMAGE_OOS(file)
      this.currentValue = path
      this.vModelMixinEmit()
      return false
    }
  }
}
</script>
