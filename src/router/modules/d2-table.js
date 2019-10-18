let menusData = []
let routes = []
const files = require.context('@/views/d2-table/', true, /page\.vue$/)
files.keys().forEach(key => {
  const component = files(key).default
  menusData.push({
    path: `/d2-table/${component.name}`,
    title: component.title
  })
  routes.push({
    path: `d2-table/${component.name}`,
    name: `d2-table-${component.name}`,
    meta: {
      title: `d2-table ${component.title}`
    },
    component
  })
})

export const menus = menusData

export default routes
