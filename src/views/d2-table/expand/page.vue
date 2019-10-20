<template>
  <d2-container spacious>
    <d2-table v-bind="table"/>
  </d2-container>
</template>

<script>
import mixin from '../mixin'
export default {
  title: '展开内容',
  name: 'expand',
  mixins: [
    mixin
  ],
  data () {
    return {
      table: {
        data: [],
        columns: [
          {
            type: 'expand',
            render: ({ row, $index }) => {
              return <section>
                <p>row.name = { row.name }</p>
                <p>row.email = { row.email }</p>
                <p>row.county = { row.county }</p>
                <p>$index = { $index }</p>
              </section>
            }
          },
          { prop: 'name', label: '姓名' },
          { prop: 'email', label: '邮箱' },
          { prop: 'county', label: '地区' }
        ]
      }
    }
  }
}
</script>
