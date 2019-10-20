import { menus as menusD2Table } from '@/router/modules/d2-table.js'
import { menus as menusCrud } from '@/router/modules/crud.js'

export default [
  { title: '表格封装', icon: 'folder-o', children: menusD2Table },
  { title: 'CRUD', icon: 'folder-o', children: menusCrud },
  {
    title: '系统管理',
    icon: 'folder-o',
    children: [
      { path: '/management/menu/list', title: '菜单管理' }
    ]
  }
]
