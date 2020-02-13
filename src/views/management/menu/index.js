import utils from '@/utils'
import table from '@/mixins/crud-table.js'

export default {
  mixins: [ table ],
  components: {
    componentForm: () => import('./form')
  },
  render () {
    const page =
      <d2-container spacious>
        <d2-search-panel slot="header" vModel={ this.search.panel.active }>
          <d2-bar slot="title">
            <d2-bar-space/>
            { this.p('query') ? null : <d2-bar-cell>{ this.vNodeSearchPanelAlertNoPermissionQuery }</d2-bar-cell> }
            <d2-bar-space/>
            <d2-bar-cell>
              <el-button-group>
                { this.p('query') ? this.vNodeButtonSearch : null }
                { this.vNodeButtonTableColumnsFilterTrigger }
              </el-button-group>
            </d2-bar-cell>
            { this.p('add') ? <d2-bar-cell>{ this.vNodeButtonCreateWithParentId0 }</d2-bar-cell> : null }
          </d2-bar>
          { this.p('query') ? this.vNodeSearchForm : null }
        </d2-search-panel>
        { this.vNodeTable }
        <component-form ref="form" on-success={ this.onFormSuccess }/>
        { this.vNodeTableColumnsFilter }
      </d2-container>
    return page
  },
  data () {
    return {
      api: {
        index: 'MENU_ALL',
        delete: 'MENU_DELETE'
      },
      permission: {
        query: 'system:menu:query',
        add: 'system:menu:add',
        edit: 'system:menu:edit',
        remove: 'system:menu:remove'
      }
    }
  },
  computed: {
    // 配置项
    // 表格列
    // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
    settingColumns () {
      return [
        { prop: 'menu_name', label: '名称', minWidth: '200px', fixed: 'left' },
        { prop: 'icon', label: '图标', render: ({ row }) => row.icon ? <d2-icon name={ row.icon }></d2-icon> : <span class="d2-opacity-3">无</span>, width: '60px' },
        { prop: 'url', label: '菜单链接', minWidth: '200px' },
        { prop: 'perms', label: '权限标识', width: '200px' },
        { prop: 'route_name', label: '路由名称', minWidth: '160px' },
        { prop: 'route_path', label: '路由地址', minWidth: '160px' },
        { prop: 'route_component', label: '路由组件', minWidth: '160px' },
        { prop: 'route_cache', label: '路由缓存', render: ({ row }) => <d2-dict name="is" value={ row.route_cache }/>, width: '80px' },
        { prop: 'id', label: 'ID', width: '100px', show: false },
        { prop: 'order_num', label: '显示排序', minWidth: '100px' },
        { prop: 'menu_type', label: '类型', render: ({ row }) => <d2-dict name="menu_type" value={ row.menu_type }/>, width: '60px' },
        { prop: 'is_frame', label: '外链', render: ({ row }) => <d2-dict name="is" value={ row.is_frame }/>, width: '60px' },
        { prop: 'visible', label: '可见性', render: ({ row }) => <d2-dict name="visible" value={ row.visible }/>, width: '60px' },
        { prop: 'create_by', label: '创建人员', width: '100px', show: false },
        { prop: 'created_at', label: '创建时间', formatter: row => utils.time.format(row.created_at, 'YYYY/M/D HH:mm:ss'), width: '140px', show: false },
        { prop: 'update_by', label: '更新人员', width: '100px', show: false },
        { prop: 'updated_at', label: '更新时间', formatter: row => utils.time.format(row.updated_at, 'YYYY/M/D HH:mm:ss'), width: '140px', show: false },
        { prop: 'remark', label: '备注', width: '200px', show: false }
      ]
    },
    // 配置项
    // 表格操作列配置
    settingActionsConfig () {
      return ({ row }) => [
        ...this.p('edit', [{ icon: 'el-icon-edit-outline', action: () => this.edit(row.id) }], []),
        ...this.p('add', [{ icon: 'el-icon-plus', type: 'primary', action: () => this.create({ parent_id: row.id }) }], []),
        ...this.p('remove', [{ icon: 'el-icon-delete', type: 'danger', confirm: `确定删除 [ ${row.menu_name} ] 吗`, action: () => this.delete(row.id) }], [])
      ]
    },
    // 配置项
    // 表格搜索条件
    // 建议的书写顺序 [prop] -> [label] -> [default] -> [render] -> [if][show]
    settingSearch () {
      return [
        {
          prop: 'menu_name',
          label: '名称',
          default: '',
          render: () => <el-input vModel={ this.search.form.model.menu_name } style="width:100px;" clearable/>
        },
        {
          prop: 'visible',
          label: '可见性',
          default: this.$env.VUE_APP_DICT_EMPTY_NUMBER,
          render: () => <d2-dict-radio vModel={ this.search.form.model.visible } name="visible" button all/>
        }
      ]
    }
  },
  methods: {
    onFormSuccess () {
      this.$store.dispatch('d2admin/permission/load', { focus: true })
      this.research()
    }
  }
}
