export default ({ request }) => ({
  /**
   * @description 菜单管理列表
   * @description http://yapi.xiya.vip/project/11/interface/api/190
   * @param {Object} data {Number} parent 父级菜单 id
   */
  MENU_FIND ({
    parent
  } = {}) {
    return request({
      url: '/api/menu/find_menus',
      method: 'post',
      data: {
        parent_id: parent
      }
    })
  },
  /**
   * @description 菜单管理列表
   * @description 获取所有菜单的层级关系
   * @description http://yapi.xiya.vip/project/11/interface/api/170
   */
  MENU_ALL () {
    return request({
      url: '/api/menu/menus',
      method: 'post'
    })
  },
  /**
   * @description 菜单管理创建
   * @description http://yapi.xiya.vip/project/11/interface/api/100
   */
  MENU_CREATE (data) {
    return request({
      url: '/api/menu/create',
      method: 'post',
      data
    })
  }
})
