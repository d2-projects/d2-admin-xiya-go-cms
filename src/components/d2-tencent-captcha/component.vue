<template>
  <span @click="onClick">
    <slot/>
  </span>
</template>

<script>
export default {
  name: 'd2-tencent-captcha',
  methods: {
    onClick () {
      const TencentCaptcha = window.TencentCaptcha
      const captcha = new TencentCaptcha(this.$env.VUE_APP_TENCENT_CAPTCHA_APP_ID, async result => {
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
      captcha.show()
    }
  }
}
</script>
