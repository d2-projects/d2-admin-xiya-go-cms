import utils from '@/utils'

export default [
  {
    path: 'demo/d2-table/base',
    name: 'demo-d2-table-base',
    meta: { title: '<d2-table> 基础', auth: true },
    component: utils.import('demo/d2-table/base')
  },
  {
    path: 'demo/crud/list',
    name: 'demo-crud-list',
    meta: { title: 'CRUD', auth: true },
    component: utils.import('demo/crud/list')
  }
]
