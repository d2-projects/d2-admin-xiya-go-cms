<template>
  <el-select
    :value="value"
    placeholder="请选择"
    @change="onSelectChange">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'd2-dict-select',
  props: {
    value: {
      default: undefined,
      required: false
    },
    name: {
      type: String,
      default: '',
      required: false
    }
  },
  data () {
    return {
      options: []
    }
  },
  watch: {
    name: {
      async handler (name) {
        this.options = await this.get(name)
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('d2admin/dict', [
      'get'
    ]),
    onSelectChange (value) {
      this.$emit('input', value)
    }
  }
}
</script>
