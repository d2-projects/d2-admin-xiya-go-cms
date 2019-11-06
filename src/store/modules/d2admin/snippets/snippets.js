exports.default = function () {
  let result = {}

  const scope = 'javascript,typescript,vue,vue-html'

  const helpers = [
    'mapState',
    'mapGetters',
    'mapMutations',
    'mapActions'
  ]

  const d2adminModules = [
    'account',
    'fullscreen',
    'page',
    'theme',
    'api',
    'gray',
    'releases',
    'transition',
    'color',
    'log',
    'search',
    'ua',
    'db',
    'dict',
    'menu',
    'size',
    'user'
  ]

  // 在组件中导入某个模块
  helpers.forEach(helper => {
    d2adminModules.forEach(d2adminModule => {
      const name = `${helper} d2:${d2adminModule}`
      result[name] = {
        scope,
        prefix: name,
        body: [
          `...${helper}('d2admin/${d2adminModule}', [`,
          `  '\$\{1:${helper.replace('map', '').toLowerCase()} name\}'`,
          `])\$\{2:,\}`
        ],
        description: `# D2Admin 状态管理 | store\n# 在组件中使用 ${helper} 导入 d2admin ${d2adminModule} 模块`
      }
    })
  })

  return result
}
