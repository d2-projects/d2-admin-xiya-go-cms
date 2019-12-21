import Cookies from 'js-cookie'
import env from '@/env'

/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting
 */
export function set (name = 'default', value = '', cookieSetting = {}) {
  let currentCookieSetting = {
    expires: 1
  }
  Object.assign(currentCookieSetting, cookieSetting)
  Cookies.set(`d2admin-${env.VUE_APP_VERSION}-${name}`, value, currentCookieSetting)
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
export function get (name = 'default') {
  return Cookies.get(`d2admin-${env.VUE_APP_VERSION}-${name}`)
}

/**
 * @description 拿到 cookie 全部的值
 */
export function getAll () {
  return Cookies.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
export function remove (name = 'default') {
  return Cookies.remove(`d2admin-${env.VUE_APP_VERSION}-${name}`)
}
