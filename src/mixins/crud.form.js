import utils from '@/utils'
import helper from './crud.form.helper'
import status from './crud.status'
import dict from './crud.dict'
import dialog from './crud.form.dialog'

export default {
  mixins: [
    helper,
    status,
    dict,
    dialog
  ],
  render () {
    const component =
      <el-dialog { ...{ attrs: this.dialog } } title={ this.title } on-close={ this.cancle }>
        <el-form ref="form" { ...{ attrs: this.form } } rules={ this.rulesFromSetting } disabled={ this.isFormDisabled } v-loading={ this.isFormLoading }>
          {
            this.setting
              .filter(item => item.show !== false)
              .map(item => <el-form-item label={ item.label } prop={ item.prop }>{ item.render() }</el-form-item>)
          }
        </el-form>
        <el-form label-width={ this.form.labelWidth }>
          <el-form-item>
            <d2-button { ...{ attrs: this.buttons.cancle } } on-click={ this.cancle }/>
            <d2-button { ...{ attrs: this.buttons.submit } } loading={ this.isSubmitButtonLoading } disabled={ this.isSubmitButtonDisabled } on-click={ this.submit }/>
          </el-form-item>
        </el-form>
      </el-dialog>
    return component
  },
  data () {
    return {
      api: {
        detail: '',
        create: '',
        update: ''
      },
      form: {
        model: {},
        labelWidth: '100px'
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
      mode: '',
      detail: {}
    }
  },
  computed: {
    // 表单设置
    setting () { return [] },
    // 根据表单设置计算出校验规规则
    rulesFromSetting () { return this.$_.fromPairs(this.setting.filter(item => item.rule).map(item => [item.prop, item.rule])) },
    // 根据表单设置计算出表单默认值
    formFromSetting () { return this.$_.fromPairs(this.setting.map(item => [item.prop, item.default])) },
    // 根据表单设置和详情计算出表单值
    formFromSettingAndDetail () { return Object.assign({}, this.formFromSetting, this.detail) },
    // 表单是否发生变化
    isFormChanged () { return !utils.helper.isIdenticalObject(this.formFromSettingAndDetail, this.form.model) }
  },
  watch: {
    rulesFromSetting: 'clearValidate'
  },
  methods: {
    /**
     * @description 重新计算 model
     * @param {Object} config {Array} pick 需要从旧的表单数据中保留的字段
     */
    reloadModel ({
      pick = []
    } = {}) {
      this.$set(this.form, 'model', Object.assign(
        {},
        // 默认值
        this.formFromSettingAndDetail,
        // 从旧的数据中保留的值
        this.$_.pick(this.form.model, pick)
      ))
    },
    /**
     * @description 初始化表单为编辑模式
     * @param {Number} id 编辑表单的唯一 id
     */
    async edit (id) {
      this.setMode('edit')
      this.open()
      try {
        await this.doLoadDict(this.loadDict)
        this.detail = await this.doLoadData(() => (this.$api[this.api.detail] || function () {})(id))
        this.reloadModel()
      } catch (error) {
        console.log(error)
        this.cancle()
      }
    },
    /**
     * @description 初始化表单为新建模式
     */
    async create (data = {}) {
      this.setMode('create')
      this.detail = data
      this.reloadModel()
      this.open()
      await this.doLoadDict(this.loadDict)
    },
    /**
     * @description 在提交表单之前可选进行数据处理
     * @param {Object} data 默认的表单数据
     */
    transformSubmitData (data) { return data },
    /**
     * @description 提交表单
     */
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        const data = this.transformSubmitData(this.form.model)
        const submit = this.switchByMode(
          () => (this.$api[this.api.create] || Promise.resolve)(data),
          () => (this.$api[this.api.update] || Promise.resolve)(data)
        )
        try {
          await this.doSubmit(submit)
          this.$message({ message: '提交成功', type: 'success' })
          this.$emit('success')
          this.cancle()
        } catch (error) {
          console.log(error)
        }
      })
    }
  }
}
