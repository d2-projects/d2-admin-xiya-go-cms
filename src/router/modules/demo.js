import utils from '@/utils'

export default [
  {
    path: 'demo/crud/list',
    name: 'demo-crud-list',
    meta: {
      title: 'CRUD',
      auth: true
    },
    component: utils.import('demo/crud/list')
  }
]
