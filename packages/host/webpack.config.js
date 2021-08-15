const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'esbuild-loader',
      },
      {
        test: /\.jsx$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'jsx',
          target: 'es2015',
        },
      },
      {
        test: /\.(c|le)ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': 'purple',
                  'link-color': 'purple',
                  'border-radius-base': '4px',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    port: 8080,
    open: true,
    // webpack module federation not support 
    // hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'Host',
      remotes: {
        GameOfLifeModule: `GameOfLifeModule@http://localhost:8081/remoteEntry.js`,
        Dijkstra: `Dijkstra@http://localhost:8082/remoteEntry.js`,
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
