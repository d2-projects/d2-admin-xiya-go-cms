export default ({ request }) => ({
  CAPTCHA_CHECK ({
    randstr = '',
    ticket = ''
  }) {
    return request({
      url: '/api/captcha/check',
      method: 'post',
      data: {
        randstr: randstr,
        ticket: ticket
      }
    })
  }
})
