const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //抽离css作为一个单独文件
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin'); //压缩css

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      ignoreOrder: true,
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerWebpackPlugin()],
    splitChunks: {
      //将第三方库(例如 lodash 或 react)提取到单独的 vendor chunk 文件中
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  // webpack性能的警告提示
  performance: {
    hints: 'warning',
    // 入口起点的最大体积
    maxEntrypointSize: 50000000,
    // 生成文件的最大体积
    maxAssetSize: 30000000,
    // 只给出js、css文件的性能提示
    assetFilter: function assetFilte(assetFilename) {
      return assetFilename.endsWith('.js') || assetFilename.endsWith('.css');
    },
  },
});
