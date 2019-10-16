export default ({ request }) => ({
  /**
   * @description 菜单管理列表
   * @description http://yapi.xiya.vip/project/11/interface/api/115
   * @param {Object} data {String} postCode 菜单名称
   * @param {Object} data {String} visible 菜单状态（1显示 2隐藏）
   */
  MENU_LIST ({
    postCode = '',
    visible = ''
  } = {}) {
    return request({
      url: '/api/menu/index',
      method: 'post',
      data: {
        post_code: postCode,
        visible: visible
      }
    })
  }
})
