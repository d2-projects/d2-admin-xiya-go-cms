import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('d2admin/dict', {
      dictSet: 'set'
    }),
    /**
     * @description 加载需要的字典数据
     * @description 这个步骤会在 edit 和 create 步骤中被调用
     */
    async loadDict () {},
    /**
     * @description 加载一个字典
     */
    async loadDictOne ({
      name = '',
      method = () => {},
      label = 'label',
      value = 'id'
    }) {
      const result = await method()
      this.dictSet({
        name,
        value: result.list.map(e => ({
          label: e[label],
          value: e[value]
        }))
      })
    }
  }
}
