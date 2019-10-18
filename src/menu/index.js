import { menus as menusD2Table } from '@/router/modules/d2-table.js'
import { menus as menusCrud } from '@/router/modules/crud.js'

export default [
  { path: '/index', title: '首页', icon: 'home' },
  { title: '表格封装', icon: 'folder-o', children: menusD2Table },
  { title: 'CRUD', icon: 'folder-o', children: menusCrud },
  {
    title: '菜单管理',
    icon: 'folder-o',
    children: [
      { path: '/management/menu/list', title: 'file' }
    ]
  }
]
