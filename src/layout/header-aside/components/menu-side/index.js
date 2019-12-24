import { mapState } from 'vuex'
import menuMixin from '../mixin/menu'
import { elMenuItem, elSubmenu } from '../utils/menu'
import BScroll from 'better-scroll'

export default {
  name: 'd2-layout-header-aside-menu-side',
  mixins: [
    menuMixin
  ],
  render (createElement) {
    return createElement('div', { attrs: { class: 'd2-layout-header-aside-menu-side' } }, [
      createElement('el-menu', {
        props: { collapse: this.asideCollapse, uniqueOpened: true },
        ref: 'menu',
        on: { select: this.handleMenuSelect }
      }, this.aside.map(menu => (menu.children === undefined ? elMenuItem : elSubmenu).call(this, createElement, menu))),
      ...this.aside.length === 0 && !this.asideCollapse ? [
        createElement('div', { attrs: { class: 'd2-layout-header-aside-menu-empty', flex: 'dir:top main:center cross:center' } }, [
          createElement('d2-icon', { props: { name: 'inbox' } }),
          createElement('span', {}, '没有侧栏菜单')
        ])
      ] : []
    ])
  },
  data () {
    return {
      BS: null
    }
  },
  computed: {
    ...mapState('d2admin/menu', [
      'aside',
      'asideCollapse'
    ])
  },
  watch: {
    // 折叠和展开菜单的时候销毁 better scroll
    asideCollapse (val) {
      this.scrollDestroy()
      setTimeout(() => {
        this.scrollInit()
      }, 500)
    },
    // 侧边栏数据发生变化时重新计算侧边栏展开状态
    aside: 'initOpenedMenu',
    // 路由变化时控制侧边栏激活状态
    '$route.fullPath': {
      handler () {
        this.$nextTick(() => {
          if (this.$refs.menu) this.$refs.menu.updateActiveIndex(this.$route.fullPath)
        })
      },
      immediate: true
    }
  },
  mounted () {
    this.scrollInit()
  },
  beforeDestroy () {
    this.scrollDestroy()
  },
  methods: {
    /**
     * @description 将之前保存的展开状态恢复到侧边栏上
     */
    initOpenedMenu () {
      this.$nextTick(() => {
        if (this.$refs.menu) this.$refs.menu.initOpenedMenu()
      })
    },
    /**
     * @description 初始化 betterscroll
     */
    scrollInit () {
      this.BS = new BScroll(this.$el, {
        mouseWheel: true,
        click: true
        // 如果你愿意可以打开显示滚动条
        // scrollbar: {
        //   fade: true,
        //   interactive: false
        // }
      })
    },
    /**
     * @description 销毁 betterscroll
     */
    scrollDestroy () {
      // https://github.com/d2-projects/d2-admin/issues/75
      try {
        this.BS.destroy()
      } catch (e) {
        delete this.BS
        this.BS = null
      }
    }
  }
}
