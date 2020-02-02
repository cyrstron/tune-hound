const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (_env, argv) => {
  const isDevelopment = argv.mode === 'development';

  const cssLoaders = [{
    loader: MiniCssExtractPlugin.loader,
  }, {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: '[name]__[local]___[hash:base64:5]',
      },
      sourceMap: true,
    },
  }];

  return {
    entry: './src/index.tsx',
    output: {
      path: path.join(__dirname, '/.dist'),
      filename: 'bundle.min.js',
    },
    resolve: {
      plugins: [
        new TsconfigPathsPlugin(),
      ],
      extensions: ['.ts', '.tsx', '.js', '.css', '.js.map'],
      symlinks: false,
      alias: {
        'react': path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: cssLoaders,
        },
        {
          test: /\.scss$/,
          use: [
            ...cssLoaders,
            {loader: 'sass-loader', options: {sourceMap: isDevelopment}},
          ],
        }
      ].filter((rule) => !!rule),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? 'style.css' : 'style.[hash].css',
        chunkFilename: isDevelopment ? '[name].css' : '[name].[hash].css',
      }),
      new Dotenv({
        path: '../.env',
        systemvars: true,
        silent: !isDevelopment,
      }),
      new CleanWebpackPlugin(),
    ],
    devServer: {
      port: 3000,
      historyApiFallback: true,
      proxy: {
        '/spotify-callback': {
          target: 'http://localhost:3001',
          secure: false,
        },
        '/deezer-callback': {
          target: 'http://localhost:3001',
          secure: false,
        },
        '/deezer-channel': {
          target: 'http://localhost:3001',
          secure: false,
        },
        '/login-spotify': {
          target: 'http://localhost:3001',
          secure: false,
        },
        '/login-deezer': {
          target: 'http://localhost:3001',
          secure: false,
        },
        '/refresh-token': {
          target: 'http://localhost:3001',
          secure: false,
        },
      },
    },
    devtool: isDevelopment ? 'eval-source-map' : undefined,
  };
};
