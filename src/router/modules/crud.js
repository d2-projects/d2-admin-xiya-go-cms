let menusData = []
let routes = []
const files = require.context('@/views/crud/', true, /page\.vue$/)
files.keys().forEach(key => {
  const component = files(key).default
  menusData.push({
    path: `/crud/${component.name}`,
    title: component.title
  })
  routes.push({
    path: `crud/${component.name}`,
    name: `crud-${component.name}`,
    meta: {
      title: `crud ${component.title}`
    },
    component
  })
})

export const menus = menusData
export default routes
