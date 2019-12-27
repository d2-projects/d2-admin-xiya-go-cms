import env from '@/env'
import * as cookies from './modules/cookies'
import * as db from './modules/db'
import * as fn from './modules/fn'
import * as helper from './modules/helper'
import * as log from './modules/log'
import * as time from './modules/time'

const utils = {
  cookies,
  time,
  db,
  fn,
  helper,
  log,
  import: require('./modules/import-' + env.NODE_ENV)
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
utils.title = function (titleText) {
  const processTitle = env.VUE_APP_TITLE || 'D2Admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
utils.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-link-temp'))
}

export default utils
