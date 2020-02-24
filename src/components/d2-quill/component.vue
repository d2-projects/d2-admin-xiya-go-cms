<style lang="scss">
.d2-quill {
  .ql-toolbar {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .ql-container {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
</style>

<template>
  <div class="d2-quill">
    <div ref="editor"></div>
  </div>
</template>

<script>
// 此组件异于 https://github.com/d2-projects/d2-admin 中的同名组件
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import fieldChange from '@/mixins/el-field-change'
export default {
  name: 'd2-quill',
  mixins: [
    fieldChange
  ],
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      Quill: undefined,
      currentValue: '',
      options: {
        theme: 'snow',
        bounds: document.body,
        debug: 'warn',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            // [{ 'script': 'sub' }, { 'script': 'super' }],
            // [{ 'indent': '-1' }, { 'indent': '+1' }],
            // [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            // [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image']
          ]
        },
        placeholder: '书写你的内容',
        readOnly: false
      }
    }
  },
  watch: {
    value: {
      handler (val) {
        // 确认是新的值
        if (val !== this.currentValue) {
          this.currentValue = val
          // 尝试更新
          if (this.Quill) {
            this.Quill.pasteHTML(this.value)
          }
        }
      },
      immediate: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const editor = this.$refs.editor
      // 初始化编辑器
      this.Quill = new Quill(editor, this.options)
      // 默认值
      this.Quill.pasteHTML(this.currentValue)
      // 绑定事件
      this.Quill.on('text-change', (delta, oldDelta, source) => {
        const html = this.$refs.editor.children[0].innerHTML
        // 更新内部的值
        this.currentValue = html
        // 更新外部值
        this.$emit('input', html)
        this.$emit('change', html)
        this.fieldChange()
      })
      // 将一些 quill 自带的事件传递出去
      this.Quill.on('text-change', (delta, oldDelta, source) => {
        this.$emit('text-change', delta, oldDelta, source)
      })
      this.Quill.on('selection-change', (range, oldRange, source) => {
        this.$emit('selection-change', range, oldRange, source)
      })
      this.Quill.on('editor-change', (eventName, ...args) => {
        this.$emit('editor-change', eventName, ...args)
      })
    }
  }
}
</script>
