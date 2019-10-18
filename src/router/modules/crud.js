import utils from '@/utils'

const config = [
  { name: 'list', title: '列表' }
]

export const menus = config.map(item => ({
  path: `/crud/${item.name}`,
  title: item.title
}))

export default config.map(item => ({
  path: `crud/${item.name}`,
  name: `crud-${item.name}`,
  meta: {
    title: `业务表格 ${item.title}`
  },
  component: utils.import(`crud/${item.name}`)
}))
