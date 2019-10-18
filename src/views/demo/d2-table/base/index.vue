<template>
  <d2-container spacious>
    <d2-table v-bind="table"/>
  </d2-container>
</template>

<script>
import Mock from 'mockjs'

// 模拟数据接口
function GET_TABLE_DATA () {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = Mock.mock({
          'list|100': [
            {
              'name': '@cname',
              'email': '@email',
              'ip': '@ip',
              'county': '@county(true)'
            }
          ]
      })
      resolve(data.list)
    }, 300)
  })
}

export default {
  data () {
    return {
      table: {
        height: '100%',
        stripe: true,
        border: true,
        data: [],
        columns: [
          {
            prop: 'name',
            label: '姓名',
            width: '80',
            fixed: 'left'
          },
          {
            prop: 'email',
            label: '邮箱',
            width: '200'
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
