import Dayjs from 'dayjs'
import zh from 'dayjs/locale/zh-cn'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
const customizedLocale = {
  ...zh,
  meridiem: (hour, minute, isLowercase) => hour > 12 ? '下午' : '上午'
}
Dayjs.locale(customizedLocale)
Dayjs.extend(LocalizedFormat)
Dayjs.extend(relativeTime)

export const dayjs = Dayjs

export function format (value, config = 'YYYY年M月D日') {
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
