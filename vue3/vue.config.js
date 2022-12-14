const { resolve } = require('path')
const path = require('path')
const WebpackBar = require('webpackbar');
const dayjs = require('dayjs')
const time = dayjs().format('YYYY-M-D HH:mm:ss')
const Timestamp = new Date().getTime();
process.env.VUE_APP_UPDATE_TIME = time;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin')


const {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  title,
  devPort,
} = require('./vue.custom.config')
module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devServer: {
    hot: true,
    port: devPort,
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: process.env.VUE_APP_BASE_API
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss'),
        path.resolve(__dirname, 'src/styles/func.scss')
      ]
    }
  },
  configureWebpack () {
    return {
      resolve: {
        alias: {
          '@': resolve('src'),
          '*': resolve(''),
          'Assets': resolve('src/assets')
        }
      },
      module: {
        rules: [
          {
            test: /\.(json5?|ya?ml)$/, // target json, json5, yaml and yml files
            loader: '@intlify/vue-i18n-loader',
            include: [ // Use `Rule.include` to specify the files of locale messages to be pre-compiled
              path.resolve(__dirname, 'src/lang')
            ]
          },
        ],
      },
      output: {
        filename: `[name].${Timestamp}.js`,
        chunkFilename: `[name].${Timestamp}.js`,
      },
      plugins: [
        new WebpackBar({
          name: title,
        })
      ]
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // ???????????????????????????
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true,  //????????????????????????console
            },
            warnings: false,
          },
          sourceMap: false,
          parallel: true,//???????????????????????????????????????????????????????????????????????????os.cpus().length - 1???
        })
      );
      // config.plugins.push(
      //   new CompressionWebpackPlugin({
      //     test: /\.js$|\.html$|.\css/, //???????????????
      //     threshold: 10240,//?????????10k???????????????
      //     deleteOriginalAssets: true //???????????????
      //   })
      // );

      // config.plugins.push(new BundleAnalyzerPlugin());

    }
  }
}
