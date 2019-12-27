export default {
  inject: {
    elFormItem: {
      default: () => ({ onFieldChange () {} })
    }
  },
  methods: {
    fieldChange () {
      this.elFormItem.onFieldChange()
    }
  }
}
