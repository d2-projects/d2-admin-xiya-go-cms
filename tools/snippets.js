// Place your d2-admin-cms-go 工作区 snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and 
// description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope 
// is left empty or omitted, the snippet gets applied to all languages. The prefix is what is 
// used to trigger the snippet and the body will be expanded and inserted. Possible variables are: 
// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. 
// Placeholders with the same ids are connected.

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
  const outputFilePath = path.join(resolve('../.vscode'), 'd2.code-snippets')

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
        scan(filePath)
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
            prefix: `d2 ${prefix}`,
            body,
            description: `${description}\n\n`
          }
        }
      }
    })
    console.log(data)
    await fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2))
  }

  async function rebuild () {
    console.log('[ snippets ] start')
    await scan(scanFolder)
    await write()
    scanResult = {}
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
