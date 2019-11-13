import store from '@/store/index'

[
  {
    name: 'menu_type',
    value: [
      { label: '目录', value: 1 },
      { label: '菜单', value: 2 },
      { label: '按钮', value: 3 }
    ]
  },
  {
    name: 'visible',
    value: [
      { label: '显示', value: 1 },
      { label: '隐藏', value: 2 }
    ]
  },
  {
    name: 'status',
    value: [
      { label: '正常', value: 1 },
      { label: '停用', value: 2 }
    ]
  },
  {
    name: 'sex',
    value: [
      { label: '男', value: 1 },
      { label: '女', value: 2 }
    ]
  },
  {
    name: 'is_frame',
    value: [
      { label: '普通', value: 1 },
      { label: '外链', value: 2 }
    ]
  },
  {
    name: 'is_default',
    value: [
      { label: '默认', value: 1 },
      { label: '非默认', value: 2 }
    ]
  },
  {
    name: 'data_scope',
    value: [
      { label: '全部数据权限', value: 1 },
      { label: '自定义数据权限', value: 2 }
    ]
  },
  {
    name: 'config_type',
    value: [
      { label: '内置', value: 1 },
      { label: '非内置', value: 2 }
    ]
  }
].forEach(dict => store.dispatch('d2admin/dict/set', dict))
