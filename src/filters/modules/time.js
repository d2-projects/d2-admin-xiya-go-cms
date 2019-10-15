import utils from '@/utils'

export default {
  timeFormat (value, config = 'YYYY年M月D日') {
    const dayjs = utils.dayjs
    let currentValue = value
    if (!dayjs.isDayjs(value)) {
      if (dayjs(value).isValid()) {
        currentValue = dayjs(value)
      } else {
        currentValue = {
          format () {
            return ''
          }
        }
      }
    }
    return currentValue.format(config)
  }
}
