import { isArray, isString } from 'lodash'
import utils from '@/utils'
import store from '@/store'

/**
 * @description 权限检查
 * @param {String|Array} value 需要的权限
 * @param {Object}} config {Boolean} all 全部匹配
 * @param {Object}} config {Boolean} not 取反
 */
export default function permission (value = '', { all = false, not = false } = {}) {
  if (isArray(value) || isString(value)) {
    const permissions = store.state.d2admin.permission.permissions
    let has = utils.helper[all ? 'allIn' : 'oneOf'](permissions, value)
    if (not) has = !has
    return has
  } else {
    return false
  }
}
