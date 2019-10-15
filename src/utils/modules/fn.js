import { get } from 'lodash'

/**
 * @description 从一个数据上尝试选择一个有效值
 * @param {Object} parent 被取值的数据
 * @param {Array} paths 可供选择的取值路径
 * @param {*} defaultValue 默认值
 */
export function getFromMulti (parent = {}, paths = [], defaultValue = '') {
  let result = defaultValue
  for (let pathIndex = 0; pathIndex < paths.length; pathIndex++) {
    const path = paths[pathIndex]
    const value = get(parent, path, defaultValue)
    if (value !== defaultValue) {
      result = value
      break
    }
  }
  return result
}
