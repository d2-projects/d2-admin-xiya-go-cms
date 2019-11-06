import utils from '@/utils'
import table from '@/mixins/crud.table.js'
import formComponent from './form'

export default {
  mixins: [ table ],
  components: { formComponent },
  render () {
    const page =
      <d2-container spacious>
        <template slot="header">
          <d2-search-panel vModel={ this.search.panel.active }>
            <d2-bar slot="title">
              <d2-bar-space/>
              <d2-bar-cell>
                <el-button-group>
                  { this.vNodeButtonSearch }
                  { this.vNodeButtonTableColumnsFilterTrigger }
                </el-button-group>
              </d2-bar-cell>
              <d2-bar-cell>
                { this.vNodeButtonCreate }
              </d2-bar-cell>
            </d2-bar>
            { this.vNodeSearchForm }
          </d2-search-panel>
        </template>
        { this.vNodeTable }
        <form-component ref="form-component" on-success={ this.research }/>
        { this.vNodeTableColumnsFilter }
      </d2-container>
    return page
  },
  data () {
    return {
      api: {
        index: 'DEPT_ALL',
        delete: 'DEPT_DELETE'
      }
    }
  },
  computed: {
    // 配置项
    // 表格列
    // [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [show]
    settingColumns () {
      return [
        { prop: 'dept_name', label: '名称', minWidth: '200px', fixed: 'left' },
        { prop: 'email', label: '邮箱', minWidth: '200px' },
        { prop: 'phone', label: '联系电话', minWidth: '200px' },
        { prop: 'status', label: '状态', minWidth: '200px' },
        { prop: 'parent_id', label: '上级部门', minWidth: '200px' },
        { prop: 'order_num', label: '显示排序', minWidth: '200px' },
        { prop: 'leader', label: '负责人', minWidth: '200px' },
        { prop: 'created_by', label: '创建人员', width: '100px', show: false },
        { prop: 'created_at', label: '创建时间', formatter: row => utils.time.format(row.created_at, 'YYYY/M/D HH:mm:ss'), width: '140px', show: false },
        { prop: 'updated_by', label: '更新人员', width: '100px', show: false },
        { prop: 'updated_at', label: '更新时间', formatter: row => utils.time.format(row.updated_at, 'YYYY/M/D HH:mm:ss'), width: '140px', show: false },
        { prop: 'remark', label: '备注', width: '200px', show: false }
      ]
    },
    // 配置项
    // 表格操作列
    // [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [show]
    settingActions () {
      return [
        {
          label: '操作',
          align: 'center',
          width: '120px',
          fixed: 'right',
          render: ({ row }) => {
            const actions = [
              {
                icon: 'el-icon-edit-outline',
                action: () => this.edit(row.id)
              },
              {
                icon: 'el-icon-plus',
                type: 'primary',
                action: () => this.create(row.id)
              },
              {
                icon: 'el-icon-delete',
                type: 'danger',
                confirm: `确定删除 [ ${row.dept_name} ] 吗`,
                action: () => this.delete(row.id)
              }
            ]
            return <d2-table-actions actions={ actions }/>
          }
        }
      ]
    },
    // 配置项
    // 搜索
    // [prop] -> [label] -> [default] -> [render]
    settingSearch () {
      return [
        {
          prop: 'dept_name',
          label: '名称',
          default: '',
          render: <el-input vModel={ this.search.form.model.dept_name } style="width:100px;"/>
        },
        {
          prop: 'status',
          label: '状态',
          default: 0,
          render: <d2-dict-select vModel={ this.search.form.model.status } name="status" style="width:100px;" all/>
        }
      ]
    }
  },
  methods: {
    /**
     * @description 加载数据
     */
    async research () {
      await this.doLoadData(async () => {
        this.table.data = []
        this.table.data = await this.$api.DEPT_ALL(this.searchData)
      })
    },
    /**
     * @description 新建
     * @description 树形结构表格 重新定义新建方法
     * @param {Number} pid 新建项目的父级 id
     */
    create (pid = 0) {
      this.$refs['form-component'].create({
        parent_id: pid
      })
    },
    /**
     * @description 编辑
     * @param {Number} id 编辑行的 id
     */
    edit (id) {
      this.$refs['form-component'].edit(id)
    },
    /**
     * @description 删除
     * @param {Number} id 删除行的 id
     */
    delete (id) {
      this.$api.DEPT_DELETE(id)
        .then(() => {
          this.$message({ message: '删除成功', type: 'success' })
          this.research()
        })
        .catch(() => {})
    }
  }
}
