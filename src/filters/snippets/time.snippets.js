// dayjs must same as src/utils/modules/dayjs.js

const dayjs = require('dayjs')
const zh = require('dayjs/locale/zh-cn')
const LocalizedFormat = require('dayjs/plugin/localizedFormat')
const relativeTime = require('dayjs/plugin/relativeTime')
const customizedLocale = {
  ...zh,
  meridiem: (hour, minute, isLowercase) => hour > 12 ? '下午' : '上午'
}
dayjs.locale(customizedLocale)
dayjs.extend(LocalizedFormat)
dayjs.extend(relativeTime)
const now = dayjs()

// https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/API-reference.md#显示

exports.default = function () {
  const formatSettings = [
    'HH:mm',
    'HH:mm:ss',
    'YYYY/M/D',
    'YYYY/MM/DD',
    'YYYY年M月D日',
    'YYYY年M月D日 HH:mm',
    'YYYY年M月D日 dddd HH:mm',
    'YYYY年M月D日 Ah点mm分',
    'YYYY年M月D日 dddd Ah点mm分'
  ]
  let result = {}
  formatSettings.forEach(setting => {
    const body = `timeFormat('${setting}')`
    result[`vue filter timeFormat ${setting}`] = {
      scope: 'javascript,typescript,vue,vue-html',
      prefix: `filter timeFormat ${setting}`,
      body: [ body ],
      description: [
        '# D2Admin 内置 Vue 过滤器',
        `渲染输出: ${now.format(setting)}`
      ].join('\n# ')
    }
  })
  return result
}
