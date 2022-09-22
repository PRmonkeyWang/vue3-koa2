const vueDefaultConfig = {
  publicPath: '/',
  outputDir: 'v3Koa',
  assetsDir: 'static',
  lintOnSave: false,
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  // webpack 配置的项目名称
  title: 'cli-template',
  devPort: '8080',
  startMessage: '欢迎使用cli-template'
}

module.exports = vueDefaultConfig
