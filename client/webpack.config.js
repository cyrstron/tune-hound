const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (_env, argv) => {
    const isDevelopment = argv.mode === 'development';

    const cssLoaders = [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        {
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: '[name]__[local]___[chunkhash:base64:5]',
                },
                sourceMap: true,
            },
        },
    ];

    const outputPath = path.join(__dirname, './.dist');
    
    return {   
        target: 'web',
        entry: {
            bundle: './src/index.tsx', 
            'service-worker': './src/service-worker/service-worker.ts',
        },
        output: {
            path: outputPath,
            filename: ({chunk}) => chunk.name === 'service-worker' ? '[name].js' : '[name].[chunkhash].js',
            clean: true,
        },
        resolve: {
            plugins: [
                new TsconfigPathsPlugin(),
            ],
            extensions: ['.ts', '.tsx', '.js', '.css', '.js.map'],
            symlinks: false,
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
            },
             {
              test: /\.svg$/,
              use: isDevelopment ? 'svg-url-loader' : 'svg-inline-loader',
            },
          ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            new MiniCssExtractPlugin({
                filename: isDevelopment ? 'style.css' : 'style.[chunkhash].css',
                chunkFilename: isDevelopment ? '[name].css' : '[name].[chunkhash].css',
            }),
            new Dotenv({
                path: '../.env',
                systemvars: true,
                silent: !isDevelopment,
            }),
        ],
        devtool: isDevelopment ? 'eval-source-map' : undefined,
        devServer: {
            host: '127.0.0.1',
            port: 3000,
            contentBase: outputPath,
            historyApiFallback: true,
            open: true,
            // hot: true,
            proxy: [
                '/deezer-test', 
                '/manifest.json',
                '/spotify-callback', 
                '/deezer-callback', 
                '/deezer-channel', 
                '/login-spotify', 
                '/login-deezer', 
                '/refresh-token', 
                '/static',
            ].reduce((proxies, route) => {
                proxies[route] = {
                    target: 'http://localhost:3001',
                    secure: false,
                };

                return proxies;
            }, {}),
        },
    };
}