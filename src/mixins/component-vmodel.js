import fieldChange from './el-field-change'

export const vModelString = {
  mixins: [
    fieldChange
  ],
  props: {
    value: {
      type: String,
      default: '',
      required: false
    }
  },
  data () {
    return {
      currentValue: ''
    }
  },
  watch: {
    value: {
      handler () {
        this.vModelMixinResetCurrentValue()
      },
      immediate: true
    }
  },
  methods: {
    vModelMixinResetCurrentValue () {
      this.currentValue = this.value
    },
    vModelMixinEmit () {
      this.$emit('input', this.currentValue)
      this.$emit('change', this.currentValue)
      this.fieldChange()
    }
  }
}
