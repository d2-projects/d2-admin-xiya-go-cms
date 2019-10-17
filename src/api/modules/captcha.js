export default ({ request }) => ({
  /**
   * @description 验证验证码
   * @param {Object} data {String} randstr 腾讯验证返回的 randstr
   * @param {Object} data {String} ticket 腾讯验证返回的 ticket
   */
  CAPTCHA_CHECK ({
    randstr = '',
    ticket = ''
  }) {
    return request({
      url: '/api/captcha/check',
      method: 'post',
      data: {
        randstr,
        ticket
      }
    })
  }
})
