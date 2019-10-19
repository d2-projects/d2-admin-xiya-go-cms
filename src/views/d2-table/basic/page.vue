<template>
  <d2-container spacious>
    <d2-table v-bind="table"/>
  </d2-container>
</template>

<script>
import mixin from '../mixin'
export default {
  title: '基础',
  name: 'basic',
  mixins: [
    mixin
  ],
  data () {
    return {
      table: {
        data: [],
        columns: [
          { prop: 'name', label: '姓名' },
          { prop: 'email', label: '邮箱' },
          { prop: 'county', label: '地区' }
        ]
      }
    }
  }
}
</script>
