const HtmlWebpackPlugin = require('html-webpack-plugin')

class KpzcCliSectionPlugin {
  constructor(options) {}

  apply(compiler) {
    console.log('KpzcCliSectionPlugin apply')
    //1. 修改模版文件的路径为壳应用下public/index.html 使用 html-webpack-plugin
    const config = {
      title: '代码片段应用',
      template: require.resolve('./public/index.html')
    }
    compiler.options.plugins.push(new HtmlWebpackPlugin(config))
    //2. 修改entry文件路径（默认指向src/main.js， 修改为壳应用src/index.js)
    compiler.options.entry.app.import[0] = require.resolve('./src/index.js')
    // console.log(compiler.options.entry.app.import[0])
    //3. 让壳应用中index.js能够找到代码片段的源文件
    compiler.options.resolve.alias[
      '@section'
    ] = `${process.cwd()}/src/index.vue`
  }
}

module.exports = KpzcCliSectionPlugin
