<template>
  <d2-container>
    <d2-table v-bind="table"/>
  </d2-container>
</template>

<script>
import mixin from '../mixin'
export default {
  mixins: [
    mixin
  ],
  data () {
    return {
      table: {
        data: [],
        columns: [
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'email',
            label: '邮箱'
          },
          {
            prop: 'ip',
            label: '上次登录 IP',
            width: '200',
            render: (h, { row, column, index }) => h('el-tag', row[column.property])
          },
          {
            prop: 'county',
            label: '地区'
          },
          {
            label: '操作',
            width: '150',
            fixed: 'right',
            align: 'center',
            render: (h, { row, column, index }) => {
              return h('span', [
                h('el-button', {
                  on: {
                    click: () => {
                      console.group('on button click')
                      console.log(row)
                      console.log(column)
                      console.log(index)
                      console.groupEnd()
                    }
                  }
                }, [
                  h('d2-icon', {
                    props: {
                      name: 'eye'
                    }
                  })
                ]),
                h('el-button', {
                  props: {
                    type: 'danger'
                  }
                }, [
                  h('d2-icon', {
                    props: {
                      name: 'trash-o'
                    }
                  })
                ])
              ])
            }
          }
        ]
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      this.table.data = await GET_TABLE_DATA()
    }
  }
}
</script>
