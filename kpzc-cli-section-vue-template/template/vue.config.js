const { defineConfig } = require('@vue/cli-service')
const KpzcCliSectionPlugin = require('kpzcCliSectionPlugin')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [new KpzcCliSectionPlugin()]
  }
})
