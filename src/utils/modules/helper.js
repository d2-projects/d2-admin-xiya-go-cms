import { omit } from 'lodash'

/**
 * @description 合法的用户名
 * @description 3~10个字符 只能是字母 数字 下划线
 * @param {String} value 需要校验的数据
 */
export function isLegalUsername (value) {
  return /^[A-Za-z_0-9]{3,10}$/.test(value)
}

/**
 * @description 合法的密码
 * @description 6-15个字符 至少包括大写 小写 下划线 数字两种
 * @param {String} value 需要校验的数据
 */
export function isLegalPassword (value) {
  if (value.length < 6 || value.length > 16) {
    return false
  }
  // 如果包含上述四种以外的字符 false
  if (/[^A-Za-z_0-9]/.test(value)) {
    return false
  }
  // 如果全为大写、小写、下划线、数字, false
  if (/(^[a-z]+$)|(^[A-Z]+$)|(^_+$)|(^\d+$)/g.test(value)) {
    return false
  }
  return true
}
/**
 * @description 同 isLegalPassword
 * @description 适用于表单校验
 */
export function isLegalPasswordValidator (rule, value, callback) {
  callback(isLegalPassword(value) ? undefined : new Error('6-15个字符，至少包括大写、小写、下划线、数字两种'))
}

/**
 * @description 合法的手机号码
 * @param {String} value 需要校验的数据
 */
export function isLegalMobilePhone (value) {
  return /^1[3-9]\d{9}$/.test(value)
}
/**
 * @description 同 isLegalMobilePhone
 * @description 适用于表单校验
 */
export function isLegalMobilePhoneValidator (rule, value, callback) {
  callback(isLegalMobilePhone(value) ? undefined : new Error('手机号码格式不正确'))
}

/**
 * @description 合法的邮箱
 * @description 名称允许汉字、字母、数字，域名只允许英文域名
 * @param {String} value 需要校验的数据
 */
export function isLegalEmail (value) {
  return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
}

/**
 * @description 同 isLegalEmail
 * @description 适用于表单校验
 */
export function isLegalEmailValidator (rule, value, callback) {
  callback(isLegalEmail(value) ? undefined : new Error('邮箱格式不正确'))
}

/**
 * @description 将树形数据扁平化
 * @param {Object} config {Array} data 树形数据
 * @param {Object} config {String} keyChildren 子节点字段名
 */
export function flatTree ({
  data = [],
  keyChildren = 'children_list'
} = {}) {
  let flat = []
  const push = tempArray => {
    tempArray.forEach(item => {
      if (item[keyChildren].length > 0) push(item[keyChildren])
      flat.push(omit(item, [ keyChildren ]))
    })
  }
  push(data)
  return flat
}
