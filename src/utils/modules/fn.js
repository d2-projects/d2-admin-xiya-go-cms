import { get } from 'lodash'

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
