export default ({ request }) => ({
  /**
   * @description 菜单列表 只获取某级菜单下的数据
   * @description http://yapi.xiya.vip/project/11/interface/api/190
   * @param {Object} data {Number} parent 父级菜单 id
   */
  MENU_FIND (id = 0) {
    return request({
      url: '/api/menu/find_menus',
      method: 'post',
      data: {
        parent_id: id
      }
    })
  },
  /**
   * @description 菜单列表
   * @description 获取所有菜单的层级关系
   * @description http://yapi.xiya.vip/project/11/interface/api/170
   */
  MENU_ALL (query = {}) {
    return request({
      url: '/api/menu/menus',
      method: 'post',
      data: query
    })
  },
  /**
   * @description 菜单列表
   * @description 当前用的的菜单列表
   * @description http://yapi.xiya.vip/project/11/interface/api/560
   */
  MENU_USER () {
    return request({
      url: '/api/menu/find_all_menu',
      method: 'post'
    })
  },
  /**
   * @description 菜单创建
   * @description http://yapi.xiya.vip/project/11/interface/api/100
   */
  MENU_CREATE (data) {
    return request({
      url: '/api/menu/create',
      method: 'put',
      data
    })
  },
  /**
   * @description 菜单详情
   * @description http://yapi.xiya.vip/project/11/interface/api/165
   */
  MENU_DETAIL (id) {
    return request({
      url: '/api/menu/update',
      method: 'post',
      data: {
        id
      }
    })
  },
  /**
   * @description 菜单编辑
   * @description http://yapi.xiya.vip/project/11/interface/api/165
   */
  MENU_UPDATE (data) {
    return request({
      url: '/api/menu/update',
      method: 'put',
      data
    })
  },
  /**
   * @description 菜单删除
   * @description http://yapi.xiya.vip/project/11/interface/api/110
   */
  MENU_DELETE (id) {
    return request({
      url: '/api/menu/delete',
      method: 'delete',
      data: {
        id
      }
    })
  }
})
