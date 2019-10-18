import Mock from 'mockjs'

// 模拟数据接口
function GET_TABLE_DATA () {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = Mock.mock({
        'list|20': [
          {
            'name': '@cname',
            'email': '@email',
            'county': '@county(true)'
          }
        ]
      })
      resolve(data.list)
    }, 300)
  })
}

export default {
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      this.table.data = await GET_TABLE_DATA()
    }
  }
}
