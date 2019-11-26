export default ({ request }) => ({
  /**
   * @description 上传图片
   * @description http://yapi.xiya.vip/project/11/interface/api/235
   */
  UPLOAD_IMAGE (image) {
    const data = new FormData()
    data.append('file', image)
    return request({
      url: '/api/upload/image',
      method: 'post',
      header: {
        'Content-Type': 'multipart/form-data'
      },
      data
    })
  },
  /**
   * @description 上传图片到百度 OOS
   * @description http://yapi.xiya.vip/project/11/interface/api/460
   */
  UPLOAD_IMAGE_OOS (image) {
    const data = new FormData()
    data.append('file', image)
    return request({
      url: '/api/upload/BaiduOSS',
      method: 'post',
      header: {
        'Content-Type': 'multipart/form-data'
      },
      data
    })
  }
})
