// 使用方式
// yarn run snippets

// 注意
// json 格式的 snippets 配置更新后会自动生成 .vscode/d2.code-snippets
// js 格式的 snippets 配置更新需要重新运行 yarn run snippets

;(async function () {

  const fs = require('fs')
  const path = require('path')

  const resolve = dir => require('path').join(__dirname, dir)
  const scanFolder = resolve('../src')

  const snippetJsonFileNameExp = /snippets\.json$/
  const snippetJsFileNameExp = /snippets\.js$/

  let scanResult = []

  /**
   * 递归扫描文件
   * @param {String} folderPath 文件夹路径
   */
  async function scan (folderPath) {
    // 获得文件夹的内容
    const files = await fs.readdirSync(folderPath)
    for (const filename of files) {
      const filePath = path.join(folderPath, filename)
      const stat = await fs.statSync(filePath)
      const isDirectory = stat.isDirectory()
      // json
      if (snippetJsonFileNameExp.test(filename)) {
        try {
          const content = await fs.readFileSync(filePath, 'utf-8')
          let contentObject = JSON.parse(content)
          scanResult.push(contentObject)
        } catch (error) { console.log(error) }
      }
      // js
      if (snippetJsFileNameExp.test(filename)) {
        try {
          const contentObject = require(filePath).default()
          scanResult.push(contentObject)
        } catch (error) { console.log(error) }
      }
      if (isDirectory) {
        await scan(filePath)
      }
    }
  }

  /**
   * 写入文件
   * @param {String} folderPath 文件夹路径
   */
  async function write () {
    const data = {}
    scanResult.forEach(file => {
      for (const name in file) {
        if (file.hasOwnProperty(name)) {
          const {
            scope,
            prefix,
            body,
            description
          } = file[name]
          data[name] = {
            scope,
            prefix: `dd ${prefix}`,
            body,
            description: `${description}\n\n`
          }
        }
      }
    })
    const dirExists = require('./dir-exists')    
    await dirExists(resolve('../.vscode'))
    await fs.writeFileSync(path.join(resolve('../.vscode'), 'd2.code-snippets'), JSON.stringify(data, null, 2))
    let count = Object.keys(data).length
    console.log(`[ snippets ] snippets x ${count}`)
  }

  async function rebuild () {
    console.log('[ snippets ] start')
    await scan(scanFolder)
    await write()
    scanResult = []
    console.log('[ snippets ] done')
  }
  
  await rebuild()

  fs.watch(scanFolder, {
    recursive: true
  }, (eventType, filename) => {
    if (filename) {
      if (snippetJsonFileNameExp.test(filename) || snippetJsFileNameExp.test(filename)) {
        console.log('[ snippets ] file chaneg: ' + filename)
        rebuild()
      }
    }
  })

  console.log('[ snippets ] watching')
})()
