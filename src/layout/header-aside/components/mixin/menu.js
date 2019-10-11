import utils from '@/utils'

export default {
  methods: {
    handleMenuSelect (index, indexPath) {
      if (/^d2-menu-empty-\d+$/.test(index) || index === undefined) {
        this.$message.warning('临时菜单')
      } else if (/^https:\/\/|http:\/\//.test(index)) {
        utils.open(index)
      } else {
        this.$router.push({
          path: index
        })
      }
    }
  }
}
