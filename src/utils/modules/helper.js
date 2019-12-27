import { omit, keys, toNumber, isNaN, isArray } from 'lodash'

/**
 * @description 将单词转换为首字母大写
 * @param {String} word 需要转化的单词
 */
export function wordUpper (word) {
  return word.replace(word[0], word[0].toUpperCase())
}

/**
 * @description 在 source 中是否至少有一个 need 中的项目
 * @param {Array} source 数据源
 * @param {Array} need 需要存在的项目
 */
export function oneOf (source, need) {
  if (isArray(need)) return need.reduce((result, item) => result || source.indexOf(item) >= 0, false)
  return source.indexOf(need) >= 0
}

/**
 * @description 在 source 包括 need
 * @param {Array} source 数据源
 * @param {Array} need 需要存在的项目
 */
export function allIn (source, need) {
  if (isArray(need)) return need.reduce((result, item) => !(result === false || source.indexOf(item) < 0), true)
  return source.indexOf(need) >= 0
}

/**
 * @description 检查一个对象是否有子元素
 * @param {Object} item 检查的对象
 * @param {String} keyname 子元素的 keyname
 */
export function hasChildren (item = {}, keyname = 'children_list') {
  return item[keyname] && isArray(item[keyname]) && item[keyname].length > 0
}

/**
 * 比较两个数组是否值一样 忽略顺序
 * @param {Array} array1 比较的数组
 * @param {Array} array2 比较的数组
 */
export function isIdenticalArray (array1, array2) {
  let result = true
  if (array1.length !== array2.length) {
    result = false
  } else {
    array1.forEach(item => {
      if (array2.indexOf(item) < 0) {
        result = false
      }
    })
  }
  return result
}

/**
 * 比较两个对象是否值一样 忽略顺序
 * @param {Array} array1 比较的对象
 * @param {Array} array2 比较的对象
 */
export function isIdenticalObject (object1, object2) {
  let result = true
  const keys1 = keys(object1)
  const keys2 = keys(object2)
  if (!isIdenticalArray(keys1, keys2)) {
    result = false
  } else {
    keys1.forEach(keyName => {
      if (object1[keyName] !== object2[keyName]) {
        result = false
      }
    })
  }
  return result
}

/**
 * @description 合法的用户名
 * @description 3~10个字符 只能是字母 数字 下划线
 * @param {String} value 需要校验的数据
 */
export function isLegalUsername (value) {
  return /^[A-Za-z_0-9]{3,12}$/.test(value)
}
/**
 * @description 同 isLegalUsername
 * @description 适用于表单校验
 */
export function isLegalUsernameValidator (rule, value, callback) {
  callback(value === '' || isLegalUsername(value) ? undefined : new Error('3~10个字符 只能是字母 数字 下划线'))
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
  callback(value === '' || isLegalPassword(value) ? undefined : new Error('6-15个字符，至少包括大写、小写、下划线、数字两种'))
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
  callback(value === '' || isLegalMobilePhone(value) ? undefined : new Error('手机号码格式不正确'))
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
  callback(value === '' || isLegalEmail(value) ? undefined : new Error('邮箱格式不正确'))
}

/**
 * @description 将树形数据扁平化 输出数组格式
 * @param {Object} config {Array} data 树形数据
 * @param {Object} config {String} keyChildren 子节点字段名
 * @param {Object} config {Boolean} includeChildren 输出的数据中是否包含子节点数据
 */
export function flatTreeToArray ({
  data = [],
  keyChildren = 'children_list',
  includeChildren = false
} = {}) {
  function maker (result, item) {
    result.push(includeChildren ? item : omit(item, [ keyChildren ]))
    if (hasChildren(item, keyChildren)) result = result.concat(item[keyChildren].reduce(maker, []))
    return result
  }
  return data.reduce(maker, [])
}

/**
 * @description 将树形数据扁平化 输出对象格式
 * @param {Object} config {Array} data 树形数据
 * @param {Object} config {String} keyChildren 子节点字段名
 * @param {Object} config {String} keyId 唯一 id 字段名
 * @param {Object} config {Boolean} includeChildren 输出的数据中是否包含子节点数据
 */
export function flatTreeToObject ({
  data = [],
  keyChildren = 'children_list',
  keyId = 'id',
  includeChildren = false
} = {}) {
  function maker (result, item) {
    result[item[keyId]] = includeChildren ? item : omit(item, [ keyChildren ])
    if (hasChildren(item, keyChildren)) Object.assign(result, item[keyChildren].reduce(maker, {}))
    return result
  }
  return data.reduce(maker, {})
}

/**
 * @description 传入一个值 返回处理成数字的结果
 * @param {Any} value 需要处理的值
 */
export function getNumberOrZero (value) {
  const result = toNumber(value)
  return isNaN(result) ? 0 : result
}
