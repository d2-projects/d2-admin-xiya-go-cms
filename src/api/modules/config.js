export default ({ request }) => ({
  /**
   * @description 参数列表
   * @description http://yapi.xiya.vip/project/11/interface/api/75
   */
  CONFIG_ALL (query = {}) {
    return request({
      url: '/api/configs/index',
      method: 'post',
      data: query
    })
  },
  /**
   * @description 参数列表 获取前端或者后端使用的参数列表 无分页
   * @description http://yapi.xiya.vip/project/11/interface/api/620
   */
  CONFIG_FIND (type = 0) {
    return request({
      url: '/api/configs/find_all',
      method: 'post',
      data: {
        type
      }
    })
  },
  /**
   * @description 参数创建
   * @description http://yapi.xiya.vip/project/11/interface/api/80
   */
  CONFIG_CREATE (data) {
    return request({
      url: '/api/configs/create',
      method: 'put',
      data
    })
  },
  /**
   * @description 参数详情
   * @description http://yapi.xiya.vip/project/11/interface/api/95
   */
  CONFIG_DETAIL (id) {
    return request({
      url: '/api/configs/update',
      method: 'post',
      data: {
        id
      }
    })
  },
  /**
   * @description 参数编辑
   * @description http://yapi.xiya.vip/project/11/interface/api/95
   */
  CONFIG_UPDATE (data) {
    return request({
      url: '/api/configs/update',
      method: 'put',
      data
    })
  },
  /**
   * @description 参数删除
   * @description http://yapi.xiya.vip/project/11/interface/api/90
   */
  CONFIG_DELETE (id) {
    return request({
      url: '/api/configs/delete',
      method: 'delete',
      data: {
        id
      }
    })
  }
})
