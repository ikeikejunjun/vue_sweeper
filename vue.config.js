const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/vue_sweeper', //Default
  outputDir: 'docs', //Default
  filenameHashing: false,
  productionSourceMap: false,
})
