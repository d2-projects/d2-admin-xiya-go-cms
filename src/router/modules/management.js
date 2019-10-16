import utils from '@/utils'

export default [
  {
    path: 'management/menu/list',
    name: 'management-menu-list',
    meta: {
      title: '菜单列表',
      auth: true
    },
    component: utils.import('management/menu/list')
  }
]
