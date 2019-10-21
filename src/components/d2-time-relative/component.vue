<template>
  <span>
    {{ relativeTime }}
  </span>
</template>

<script>
import utils from '@/utils'

export default {
  name: 'd2-time-relative',
  props: {
    value: {
      default: new Date(),
      required: false
    },
    interval: {
      default: 1000 * 60,
      required: false
    }
  },
  data () {
    return {
      relativeTime: '',
      timer: null
    }
  },
  created () {
    this.refresh()
    this.timer = setInterval(() => {
      this.refresh()
    }, this.interval)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    refresh () {
      this.relativeTime = utils.time.dayjs(this.value).fromNow()
    }
  }
}
</script>
