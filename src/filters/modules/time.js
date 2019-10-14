import utils from '@/utils'

// | `YY`   | 18               | 两位数的年份                   |
// | `YYYY` | 2018             | 四位数的年份                   |
// | `M`    | 1-12             | 月份，从 1 开始                |
// | `MM`   | 01-12            | 月份，两位数                   |
// | `MMM`  | Jan-Dec          | 简写的月份名称                 |
// | `MMMM` | January-December | 完整的月份名称                 |
// | `D`    | 1-31             | 月份里的一天                   |
// | `DD`   | 01-31            | 月份里的一天，两位数             |
// | `d`    | 0-6              | 一周中的一天，星期天是 0         |
// | `dd`   | Su-Sa            | 最简写的一周中一天的名称         |
// | `ddd`  | Sun-Sat          | 简写的一周中一天的名称           |
// | `dddd` | Sunday-Saturday  | 一周中一天的名称                |
// | `H`    | 0-23             | 小时                          |
// | `HH`   | 00-23            | 小时，两位数                   |
// | `h`    | 1-12             | 小时, 12 小时制                |
// | `hh`   | 01-12            | Hours, 12 小时制, 两位数       |
// | `m`    | 0-59             | 分钟                          |
// | `mm`   | 00-59            | 分钟，两位数                   |
// | `s`    | 0-59             | 秒                           |
// | `ss`   | 00-59            | 秒 两位数                     |
// | `SSS`  | 000-999          | 毫秒 三位数                    |
// | `Z`    | +05:00           | UTC 的偏移量                  |
// | `ZZ`   | +0500            | UTC 的偏移量，数字前面加上 0     |
// | `A`    | AM PM            |                              |
// | `a`    | am pm            |                              |

// | ------ | --------------------------------- | --------------------------------------- |
// | `LT`   | HH:mm                             | 8:02                                    |
// | `LTS`  | HH:mm:ss                          | 15:25:50                                |
// | `L`    | YYYY/MM/DD                        | 2010/02/14                              |
// | `LL`   | YYYY 年 M 月 D 日                  | 2010 年 2 月 14 日                       |
// | `LLL`  | YYYY 年 M 月 D 日 Ah 点 mm 分       | 2010 年 2 月 14 日下午 3 点 25 分         |
// | `LLLL` | YYYY 年 M 月 D 日 ddddAh 点 mm 分   | 2010 年 2 月 14 日星期日下午 3 点 25 分    |
// | `l`    | YYYY/M/D                          | 2010/2/14                               |
// | `ll`   | YYYY 年 M 月 D 日                  | 2010 年 2 月 14 日                       |
// | `lll`  | YYYY 年 M 月 D 日 HH:mm            | 2010 年 2 月 14 日 15:25                 |
// | `llll` | YYYY 年 M 月 D 日 dddd HH:mm       | 2010 年 2 月 14 日星期日 15:25            |

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
