<template>
  <span>
    <slot/>
  </span>
</template>

<script>
export default {
  name: 'd2-tencent-captcha',
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const TencentCaptcha = window.TencentCaptcha
      new TencentCaptcha(this.$el, String(process.env.VUE_APP_TENCENT_CAPTCHA_APP_ID), async result => {
        if (result.ret === 0) {
          const { randstr, ticket } = result
          try {
            await this.$api.CAPTCHA_CHECK({
              randstr,
              ticket
            })
            this.$emit('success')
          } catch (error) {}
        }
      }, {})
    }
  }
}
</script>
