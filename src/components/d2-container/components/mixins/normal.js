// 提供滚动方面的功能
// 非滚动优化模式通用

export default {
  props: {
    // 滚动事件节流间隔
    scrollDelay: {
      type: Number,
      required: false,
      default: 10
    },
    // 更大的空间
    spacious: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      handleScroll: null
    }
  },
  watch: {
    scrollDelay (val) {
      // 移除旧的监听
      this.removeScrollListener()
      // 生成新的 handle 方法
      this.handleScroll = this.handleMaker(val)
      // 添加新的监听
      this.addScrollListener()
    }
  },
  methods: {
    // 生成滚动事件的 handler
    handleMaker (wait) {
      return this._.throttle(e => {
        this.$emit('scroll', {
          x: e.target.scrollLeft,
          y: e.target.scrollTop
        })
      }, wait)
    },
    // 增加滚动事件监听
    addScrollListener () {
      if (typeof this.handleScroll !== 'function') {
        // mounted 生命周期内调用这个方法的时候会进入这里的判断
        this.handleScroll = this.handleMaker(this.scrollDelay)
      }
      // 添加监听
      this.$refs.body.addEventListener('scroll', this.handleScroll)
    },
    // 移除滚动事件监听
    removeScrollListener () {
      this.$refs.body.removeEventListener('scroll', this.handleScroll)
    },
    // 外部调用的方法 返回顶部
    scrollToTop () {
      const smoothscroll = () => {
        const body = this.$refs.body
        const currentScroll = body.scrollTop
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll)
          body.scrollTo(0, currentScroll - (currentScroll / 5))
        }
      }
      smoothscroll()
    }
  }
}
