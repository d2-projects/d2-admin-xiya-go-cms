import { cloneDeep } from 'lodash'

const env = cloneDeep(process.env)

let newEnv = {}

Object.keys(env).forEach(keyname => {
  if (/^.+\|(number|string)$/.test(env[keyname])) {
    const [ value, type ] = env[keyname].split('|')
    switch (type) {
      case 'number': newEnv[keyname] = Number(value); break
      case 'string':
        if (value === 'empty') newEnv[keyname] = ''
        else newEnv[keyname] = String(value)
        break
      default: break
    }
  } else {
    newEnv[keyname] = env[keyname]
  }
})

export default newEnv
