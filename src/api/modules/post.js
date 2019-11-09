export default ({ request }) => ({
  /**
   * @description 岗位列表
   * @description http://yapi.xiya.vip/project/11/interface/api/75
   */
  POST_ALL (query = {}) {
    return request({
      url: '/api/post/index',
      method: 'post',
      data: query
    })
  },
  /**
   * @description 岗位创建
   * @description http://yapi.xiya.vip/project/11/interface/api/80
   */
  POST_CREATE (data) {
    return request({
      url: '/api/post/create',
      method: 'put',
      data
    })
  },
  /**
   * @description 岗位详情
   * @description http://yapi.xiya.vip/project/11/interface/api/95
   */
  POST_DETAIL (id) {
    return request({
      url: '/api/post/update',
      method: 'post',
      data: {
        id
      }
    })
  },
  /**
   * @description 岗位编辑
   * @description http://yapi.xiya.vip/project/11/interface/api/95
   */
  POST_UPDATE (data) {
    return request({
      url: '/api/post/update',
      method: 'put',
      data
    })
  },
  /**
   * @description 岗位删除
   * @description http://yapi.xiya.vip/project/11/interface/api/90
   */
  POST_DELETE (id) {
    return request({
      url: '/api/post/delete',
      method: 'delete',
      data: {
        id
      }
    })
  }
})
