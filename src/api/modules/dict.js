export default ({ request }) => ({
  /**
   * @description 字典列表
   * @description http://yapi.xiya.vip/project/11/interface/api/75
   */
  DICT_ALL (query = {}) {
    return request({
      url: '/api/dict/index',
      method: 'post',
      data: query
    })
  },
  /**
   * @description 字典创建
   * @description http://yapi.xiya.vip/project/11/interface/api/80
   */
  DICT_CREATE (data) {
    return request({
      url: '/api/dict/create',
      method: 'put',
      data
    })
  },
  /**
   * @description 字典详情
   * @description http://yapi.xiya.vip/project/11/interface/api/95
   */
  DICT_DETAIL (id) {
    return request({
      url: '/api/dict/update',
      method: 'post',
      data: {
        id
      }
    })
  },
  /**
   * @description 字典编辑
   * @description http://yapi.xiya.vip/project/11/interface/api/95
   */
  DICT_UPDATE (data) {
    return request({
      url: '/api/dict/update',
      method: 'put',
      data
    })
  },
  /**
   * @description 字典删除
   * @description http://yapi.xiya.vip/project/11/interface/api/90
   */
  DICT_DELETE (id) {
    return request({
      url: '/api/dict/delete',
      method: 'delete',
      data: {
        id
      }
    })
  }
})
