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
          <d2-bar slot="prefix">
            <d2-bar-cell>
              <d2-button type="primary" icon="el-icon-arrow-left" label="返回字典列表" to="/management/dict" plain/>
            </d2-bar-cell>
          </d2-bar>
          <d2-bar slot="title">
            <d2-bar-space/>
            { this.p('query') ? <d2-bar-cell>{ this.vNodePaginationMini }</d2-bar-cell> : <d2-bar-cell>{ this.vNodeSearchPanelAlertNoPermissionQuery }</d2-bar-cell> }
            <d2-bar-space/>
            <d2-bar-cell>
              <el-button-group>
                { this.p('query') ? this.vNodeButtonSearch : null }
                { this.vNodeButtonTableColumnsFilterTrigger }
              </el-button-group>
            </d2-bar-cell>
            { this.dictValueType !== 0 && this.p('add') ? <d2-bar-cell>{ this.vNodeButtonCreate }</d2-bar-cell> : undefined }
          </d2-bar>
          { this.p('query') ? this.vNodeSearchForm : null }
        </d2-search-panel>
        { this.vNodeTable }
        <d2-bar slot="footer">
          <d2-bar-cell>{ this.vNodePaginationFull }</d2-bar-cell>
          <d2-bar-space/>
        </d2-bar>
        <component-form ref="form" dict-type={ this.dictValueType } on-success={ this.research }/>
        { this.vNodeTableColumnsFilter }
      </d2-container>
    return page
  },
  data () {
    return {
      api: {
        index: 'DICTDATA_ALL',
        delete: 'DICTDATA_DELETE'
      },
      permission: {
        query: 'system:dict-data:query',
        add: 'system:dict-data:add',
        edit: 'system:dict-data:edit',
        remove: 'system:dict-data:remove'
      },
      // [本页面特有] 当前选择的字典的值类型 1 数字 2 字符
      dictValueType: 0
    }
  },
  computed: {
    // 配置项
    // 表格列
    // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
    settingColumns () {
      return [
        { prop: 'dict_label', label: '字典标签', minWidth: '100px', fixed: 'left' },
        { prop: 'dict_type', label: '标识', minWidth: '100px' },
        {
          prop: 'dict_number',
          label: '字典值',
          minWidth: '100px',
          formatter: row => row.dict_number === 0 ? '' : row.dict_number,
          show: this.dictValueType === 0 || this.dictValueType === 1
        },
        {
          prop: 'dict_value',
          label: '字典值',
          minWidth: '100px',
          show: this.dictValueType === 0 || this.dictValueType === 2
        },
        { prop: 'status', label: '状态', width: '100px', render: ({ row }) => <d2-dict name="status" value={ row.status }/>, show: false },
        { prop: 'remark', label: '备注', width: '100px', show: false },
        { prop: 'create_by', label: '创建人员', width: '100px', show: false },
        { prop: 'created_at', label: '创建时间', width: '200px', formatter: row => utils.time.format(row.created_at, 'YYYY/M/D HH:mm:ss'), show: false },
        { prop: 'update_by', label: '更新人员', width: '100px', show: false },
        { prop: 'updated_at', label: '更新时间', width: '200px', formatter: row => utils.time.format(row.updated_at, 'YYYY/M/D HH:mm:ss'), show: false }
      ].map(setting => {
        setting.sortable = 'custom'
        return setting
      })
    },
    // 配置项
    // 表格操作列配置
    settingActionsConfig () {
      return ({ row }) => [
        ...this.p('edit', [{ icon: 'el-icon-edit-outline', action: () => this.edit(row.id) }], []),
        ...this.p('remove', [{ icon: 'el-icon-delete', type: 'danger', confirm: `确定删除 [ ${row.dict_label} ] 吗`, action: () => this.delete(row.id) }], [])
      ]
    },
    // 配置项
    // 表格搜索条件
    // 建议的书写顺序 [prop] -> [label] -> [default] -> [render] -> [if][show]
    settingSearch () {
      return [
        {
          prop: 'dict_id',
          label: '字典名称',
          default: this.dictId,
          render: () => <d2-dict-select vModel={ this.search.form.model.dict_id } name="dict_id" custom all/>
        },
        {
          prop: 'dict_label',
          label: '字典标签',
          default: '',
          render: () => <el-input vModel={ this.search.form.model.dict_label } style="width:100px;" clearable/>
        },
        {
          prop: 'dict_value',
          label: '字典值',
          default: '',
          render: () => <el-input vModel={ this.search.form.model.dict_value } style="width:100px;" clearable/>
        },
        {
          prop: 'status',
          label: '状态',
          default: this.$env.VUE_APP_DICT_EMPTY_NUMBER,
          render: () => <d2-dict-radio vModel={ this.search.form.model.status } name="status" button all/>
        }
      ]
    },
    // [本页面特有] 父级字典项目的 id 强制转为数字
    dictId () {
      return utils.helper.getNumberOrZero(this.$route.query.dict_id)
    }
  },
  methods: {
    /**
     * @description 搜索方法
     * @returns 数据
     */
    async searchMethod () {
      // 获得父级字典的类型
      const dictIdInSearchForm = this.search.form.model.dict_id
      if (dictIdInSearchForm !== 0) {
        const dict = await this.$api.DICT_DETAIL(dictIdInSearchForm)
        this.dictValueType = this._.get(dict, 'dict_value_type', 0)
      }
      // 获取当前字典下的条目
      const method = this.$api[this.api.index]
      const dictData = await method(this.searchData)
      // 返回给下一步处理
      return dictData
    },
    /**
     * @description 加载需要的字典数据
     */
    loadDict () {
      // 字典
      this.loadDictOne({
        name: 'dict_id',
        method: this.$api.DICT_ALL,
        fields: 'dict_name,id',
        path: 'list',
        label: 'dict_name'
      })
    }
  }
}
