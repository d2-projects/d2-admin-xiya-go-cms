export default ({ request }) => ({
  /**
   * @description 部门列表
   * @description 获取所有部门的层级关系
   * @description http://yapi.xiya.vip/project/11/interface/api/195
   */
  DEPT_ALL (query = {}) {
    return request({
      url: '/api/dept/findall',
      method: 'post',
      data: query
    })
  },
  /**
   * @description 部门创建
   * @description http://yapi.xiya.vip/project/11/interface/api/200
   */
  DEPT_CREATE (data) {
    return request({
      url: '/api/dept/create',
      method: 'put',
      data
    })
  },
  /**
   * @description 部门详情
   * @description http://yapi.xiya.vip/project/11/interface/api/210
   */
  DEPT_DETAIL (id) {
    return request({
      url: '/api/dept/update',
      method: 'post',
      data: {
        id
      }
    })
  },
  /**
   * @description 部门编辑
   * @description http://yapi.xiya.vip/project/11/interface/api/210
   */
  DEPT_UPDATE (data) {
    return request({
      url: '/api/dept/update',
      method: 'put',
      data
    })
  },
  /**
   * @description 部门删除
   * @description http://yapi.xiya.vip/project/11/interface/api/205
   */
  DEPT_DELETE (id) {
    return request({
      url: '/api/dept/delete',
      method: 'delete',
      data: {
        id
      }
    })
  }
})
