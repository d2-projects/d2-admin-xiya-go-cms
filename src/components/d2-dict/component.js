import { mapActions } from 'vuex'

export default {
  name: 'd2-dict',
  render () {
    return <span class="d2-dict">{ this.currentValue }</span>
  },
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
  computed: {
    currentValue () {
      const item = this.options.find(e => e.value === this.value)
      return item ? item.label : ''
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
    ])
  }
}
