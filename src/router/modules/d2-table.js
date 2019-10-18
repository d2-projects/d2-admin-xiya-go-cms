import utils from '@/utils'

const config = [
  { name: 'base', title: '基础' },
  { name: 'render', title: 'render 函数' }
]

export const menus = config.map(item => ({
  path: `/d2-table/${item.name}`,
  title: item.title
}))

export default config.map(item => ({
  path: `d2-table/${item.name}`,
  name: `d2-table-${item.name}`,
  meta: {
    title: `d2-table ${item.title}`
  },
  component: utils.import(`d2-table/${item.name}`)
}))
