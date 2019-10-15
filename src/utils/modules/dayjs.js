import dayjs from 'dayjs'
import zh from 'dayjs/locale/zh-cn'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
const customizedLocale = {
  ...zh,
  meridiem: (hour, minute, isLowercase) => hour > 12 ? '下午' : '上午'
}
dayjs.locale(customizedLocale)
dayjs.extend(LocalizedFormat)
dayjs.extend(relativeTime)

export default dayjs
