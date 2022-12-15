const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV === "development";
const getLoader = () =>
  devMode ? "style-loader" : MiniCssExtractPlugin.loader;

module.exports = {
  entry: path.resolve(__dirname, "../src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[chunkhash:8].js",
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          getLoader(),
          { loader: "css-loader", options: { modules: true } },
          "postcss-loader",
        ],
      },
      // 解决使用css modules时antd样式不生效
      {
        test: /\.css$/,
        // 排除业务模块 其他模块都不采用css modules方式解析
        exclude: /src/,
        use: [getLoader(), "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          getLoader(),
          { loader: "css-loader", options: { modules: true } },
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/, //匹配图片
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, //匹配文字
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      favicon: path.resolve(__dirname, "../public/logo.svg"),
      title: "webpack-react-ts-pc",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: "",
          globOptions: {
            ignore: ["**/*.html"],
          },
        },
      ],
    }),
  ],
  stats: "errors-only",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
  externals: {
    AMap: "AMap", // 高德地图配置
  },
};
