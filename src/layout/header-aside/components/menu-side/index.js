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
        props: {
          collapse: this.asideCollapse,
          uniqueOpened: true,
          defaultActive: this.active
        },
        ref: 'menu',
        on: {
          select: this.handleMenuSelect,
          open: this.reloadOpeneds,
          close: this.reloadOpeneds
        }
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
      active: '',
      asideHeight: 300,
      openeds: [],
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
    aside () {
      this.setOpeneds()
    },
    // 监听路由 控制侧边栏激活状态
    '$route.fullPath': {
      handler (value) {
        this.active = value
        this.reloadOpeneds()
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
     * @description 重新获取侧边栏展开的数据
     */
    reloadOpeneds () {
      this.$nextTick(() => {
        if (this.$refs.menu) this.openeds = this.$refs.menu.openedMenus
      })
    },
    /**
     * @description 将之前保存的展开状态恢复到侧边栏上
     */
    setOpeneds () {
      this.$nextTick(() => {
        if (this.$refs.menu) this.openeds.forEach(this.$refs.menu.open)
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
