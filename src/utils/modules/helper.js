/**
 * @description 从设置函数中提取表单默认值
 * @param {Function} settingFunction 设置函数
 */
export function getFormFromSetting (settingFunction) {
  let form = {}
  settingFunction.call({ form: {} }).forEach(item => {
    form[item.prop] = item.default
  })
  return form
}

/**
 * @description 从设置函数中提取表校验设置
 * @param {Function} settingFunction 设置函数
 */
export function getRulesFromSetting (settingFunction) {
  let rules = {}
  settingFunction.call({ form: {} })
    .filter(item => item.rule)
    .forEach(item => rules[item.prop] = item.rule)
  return rules
}
