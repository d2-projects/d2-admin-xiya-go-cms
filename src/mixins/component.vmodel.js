import fieldChange from './el.fieldChange'

export function vModelString (propsDefault = '') {
  return {
    mixins: [
      fieldChange
    ],
    props: {
      value: {
        type: String,
        default: propsDefault,
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
}
