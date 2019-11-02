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
import { cloneDeep } from 'lodash'
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
    // 增加 [全部] 选项
    all: {
      type: Boolean,
      default: false,
      required: false
    },
    // 增加 [全部] 选项
    // [全部] 选项的标题
    allLabel: {
      type: String,
      default: '全部',
      required: false
    },
    // 增加 [全部] 选项
    // [全部] 选项的值
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
        const options = cloneDeep(await this.dictGet(name))
        if (this.all) {
          options.unshift(optionItenAll)
        }
        this.options = options
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('d2admin/dict', {
      dictGet: 'get'
    }),
    onSelectChange (value) {
      this.$emit('input', value)
    }
  }
}
</script>
