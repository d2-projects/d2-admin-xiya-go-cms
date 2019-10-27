import { cloneDeep } from 'lodash'
import utils from '@/utils'

export default function ({
  setting
}) {
  const form = utils.helper.getFormFromSetting(setting)
  const rules = utils.helper.getRulesFromSetting(setting)
  return {
    render () {
      return <el-dialog
        { ...{ attrs: this.dialog } }
        title={ this.title }
        on-close={ () => { this.dialog.visible = false } }>
        <el-form
          ref="form"
          { ...{ attrs: this.form } }
          rules={ this.rules }
          disabled={ this.isFormDisabled }
          v-loading={ this.isFormLoading }>
          {
            setting.call(this, this.$createElement).map(
              item =>
                <el-form-item label={ item.label } prop={ item.prop }>
                  { item.render }
                </el-form-item>
            )
          }
        </el-form>
        <el-form label-width={ this.form.labelWidth }>
          <el-form-item>
            <d2-button { ...{ attrs: this.buttons.cancle } } on-click={ this.cancle }/>
            <d2-button { ...{ attrs: this.buttons.submit } } on-click={ this.submit }/>
          </el-form-item>
        </el-form>
      </el-dialog>
    },
    data () {
      return {
        cache: {
          form
        },
        form: {
          model: form,
          labelWidth: '100px',
          statusIcon: true
        },
        dialog: {
          visible: false,
          showClose: false,
          top: '0px',
          width: '400px',
          customClass: 'el-dialog__no-top-border',
          destroyOnClose: true,
          appendToBody: true
        },
        buttons: {
          cancle: {
            label: '取消',
            plain: true
          },
          submit: {
            label: '保存',
            type: 'primary',
            icon: 'el-icon-check'
          }
        },
        status: {
          isLoadingData: false,
          isLoadingDict: false,
          isSubmitting: false
        },
        mode: ''
      }
    },
    computed: {
      rules () {
        return rules
      },
      title () {
        return this.switchByMode('新建', '编辑')
      },
      isFormDisabled () {
        return this.status.isLoadingData || this.status.isLoadingDict
      },
      isFormLoading () {
        return this.status.isLoadingData || this.status.isLoadingDict
      },
      isSubmitButtonLoading () {
        return false
      }
    },
    methods: {
      /**
       * @description 请求表单数据
       * @param {Function} fn 请求函数 需要返回 Promise
       */
      async doLoadData (fn) {
        this.status.isLoadingData = true
        try {
          const data = await fn()
          this.status.isLoadingData = false
          return Promise.resolve(data)
        } catch (error) {
          this.status.isLoadingData = false
          return Promise.reject(error)
        }
      },
      /**
       * @description 请求字典数据
       * @param {Function} fn 请求函数 需要返回 Promise
       */
      async doLoadDict (fn) {
        this.status.isLoadingDict = true
        try {
          const data = await fn()
          this.status.isLoadingDict = false
          return Promise.resolve(data)
        } catch (error) {
          this.status.isLoadingDict = false
          return Promise.reject(error)
        }
      },
      /**
       * @description 发送数据
       * @param {Function} fn 请求函数 需要返回 Promise
       */
      async doSubmit (fn) {
        this.status.isSubmitting = true
        try {
          const data = await fn()
          this.status.isSubmitting = false
          return Promise.resolve(data)
        } catch (error) {
          this.status.isSubmitting = false
          return Promise.reject(error)
        }
      },
      /**
       * 设置表单
       * @param {Object} config 覆盖默认值的数据
       */
      setFormData (config = {}) {
        this.form.model = Object.assign(cloneDeep(this.cache.form), config)
      },
      /**
       * 设置表单模式
       * @param {String} mode 模式名称 edit or create
       */
      setMode (mode) {
        this.mode = mode
      },
      /**
       * @description 根据不同的模式 返回不同的值
       * @param {*} createModeValve 新增模式返回值
       * @param {*} editModeValue 编辑模式返回值
       * @param {*} defaultValue 没有匹配的模式返回值 默认为 createModeValve
       */
      switchByMode (createModeValve = '', editModeValue = '', defaultValue = createModeValve) {
        if (this.mode === 'create') {
          return createModeValve
        } else if (this.mode === 'edit') {
          return editModeValue
        } else {
          return defaultValue
        }
      },
      /**
       * @description 打开面板
       */
      open () {
        this.dialog.visible = true
      },
      /**
       * @description 关闭面板
       */
      cancle () {
        this.dialog.visible = false
      }
    }
  }
}
