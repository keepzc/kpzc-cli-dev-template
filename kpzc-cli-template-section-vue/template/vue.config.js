const { defineConfig } = require('@vue/cli-service')
const KpzcCliSectionPlugin = require('kpzc-cli-section-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [new KpzcCliSectionPlugin()]
  }
})
