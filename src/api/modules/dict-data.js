export default ({ request }) => ({
  /**
   * @description 字典数据列表
   * @description http://yapi.xiya.vip/project/11/interface/api/75
   */
  DICTDATA_ALL (query = {}) {
    return request({
      url: '/api/dictData/index',
      method: 'post',
      data: query
    })
  },
  /**
   * @description 字典数据创建
   * @description http://yapi.xiya.vip/project/11/interface/api/80
   */
  DICTDATA_CREATE (data) {
    return request({
      url: '/api/dictData/create',
      method: 'put',
      data
    })
  },
  /**
   * @description 字典数据详情
   * @description http://yapi.xiya.vip/project/11/interface/api/95
   */
  DICTDATA_DETAIL (id) {
    return request({
      url: '/api/dictData/update',
      method: 'post',
      data: {
        id
      }
    })
  },
  /**
   * @description 字典数据编辑
   * @description http://yapi.xiya.vip/project/11/interface/api/95
   */
  DICTDATA_UPDATE (data) {
    return request({
      url: '/api/dictData/update',
      method: 'put',
      data
    })
  },
  /**
   * @description 字典数据删除
   * @description http://yapi.xiya.vip/project/11/interface/api/90
   */
  DICTDATA_DELETE (id) {
    return request({
      url: '/api/dictData/delete',
      method: 'delete',
      data: {
        id
      }
    })
  }
})
