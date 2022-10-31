const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: prod ? 'production' : 'development',
  devtool: prod ? undefined : 'source-map',
  entry: {
    popup: "./src/popup.jsx",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: 'ts-loader',
      },
      {
        test: /\.(js|jsx)?$/,
        use: {
            loader: "babel-loader",
            options:{
                presets: ["@babel/preset-react","@babel/preset-env"]
            }
        },
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/popup.html',
    filename: 'popup.html',
  }), 
  new CopyPlugin({
    patterns: [
      { from: "public" },
    ],
  })],
};
