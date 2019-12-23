exports.default = function () {
  let result = {}

  const scope = 'javascript,typescript,vue,vue-html'

  const helpers = [
    'mapState',
    'mapGetters',
    'mapMutations',
    'mapActions'
  ]

  // 在文件中导入 store
  result['store import at .js'] = {
    scope,
    prefix: 'store import',
    body: [
      `import store from '@/store'`
    ],
    description: `# D2Admin 状态管理 | store\n# 在 js 文件中导入 store`
  }

  // 在组件中导入全部辅助方法
  result['store import all'] = {
    scope,
    prefix: 'store import all',
    body: [
      `import { ${helpers.join(', ')} } from 'vuex'`
    ],
    description: `# D2Admin 状态管理 | store\n# 在组件中导入 store`
  }

  // 在组件中导入某个辅助方法
  helpers.forEach(helper => {
    result[helper] = {
      scope,
      prefix: helper,
      body: [
        `import { ${helper} } from 'vuex'`
      ],
      description: `# D2Admin 状态管理 | store\n# 在组件中导入 ${helper} 辅助方法`
    }
  })

  return result
}
