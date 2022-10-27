const { merge } = require('webpack-merge'); // 引入webpack-merge功能模块
const common = require('./webpack.common.js'); // 引入webpack.common.js
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: '../dist', //将dist目录下的文件serve到localhost:port下
    port: 8088, //端口号设置
    // open: true, //自动打开浏览器
    compress: true, //gzip压缩
    client: {
      progress: true, //在浏览器中显示百分比进度
    },
    historyApiFallback: true, //解决单页面在路由跳转之后 进行页面刷新时 返回404错误的问题
    host: '0.0.0.0', //服务器可以被外部访问
    proxy: {
      '/api': {
        target: 'http://localhost:3000/', //代理，接口重写
        pathRewrite: { '^/api': '' }, //不需传/api
      },
    },
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `App is running in: ${process.env.NODE_ENV} environment.\n`,
          `- Local: 'http://localhost:8088/'`,
        ],
        notes: [
          'Note that the development build is not optimized.',
          `To create a production build, run npm run build or yarn build
          \n`,
        ],
      },
      clearConsole: true,
    }),
  ],
});
