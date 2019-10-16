// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '演示',
    icon: 'folder-o',
    children: [
      { path: '/demo/crud/list', title: 'CRUD' }
    ]
  },
  {
    title: '菜单管理',
    icon: 'folder-o',
    children: [
      { path: '/management/menu/list', title: 'file' }
    ]
  }
]
