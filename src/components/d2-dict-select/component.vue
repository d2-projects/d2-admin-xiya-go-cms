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
      type: [ Number, String ],
      default: undefined,
      required: false
    },
    name: {
      type: String,
      default: '',
      required: false
    },
    all: {
      type: Boolean,
      default: false,
      required: false
    },
    allLabel: {
      type: String,
      default: '全部',
      required: false
    },
    allValue: {
      type: [ Number, String ],
      default: 0,
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
        const optionItenAll = {
          label: this.allLabel,
          value: this.allValue
        }
        const options = await this.get(name)
        if (this.all) {
          options.unshift(optionItenAll)
        }
        this.options = options
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
