// 菜单 顶栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    path: '/index',
    title: '表格',
    children: [
      {
        path: '/demo/d2-table/base',
        title: '基础'
      }
    ]
  }
]
