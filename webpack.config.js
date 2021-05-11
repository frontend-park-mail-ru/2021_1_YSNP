/* eslint-disable */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
    entry: './public/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new WebpackPwaManifest({
            name: 'KOYA',
            short_name: 'KOYA',
            description: 'Лучший сайт по поиску товаров',
            icons: [
                {
                    src: path.resolve('public/img/favicon.svg'),
                    sizes: [96, 128, 192, 256, 384, 512, 1024]
                }
            ],
            start_url: '/',
            display: 'fullscreen',
            theme_color: '#d31e1e',
            background_color: 'white'
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public/img/',
                    to: 'img/'
                },
                {
                    from: 'public/all.js',
                    to: ''
                },
                {
                    from: 'public/img/svg',
                    to: 'img/svg'
                },
                {
                    from: 'public/sw.js',
                    to: ''
                },
                {
                    from: 'public/fonts/',
                    to: 'fonts/'
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        require('autoprefixer')
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /.(s*)css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?url=false',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.hbs/,
                loader: 'handlebars-loader',
                options: {
                    runtime: path.resolve(__dirname, 'server/handlebars.js')
                }
            },
            {
                test: /\.svg$/,
                use: {
                    loader: 'svg-url-loader',
                    options: {
                        name: './img/svg/[name].[ext]'
                    }
                }
            },
            {
                test: /\.png$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: './img/[name].[ext]'
                    }
                }

            },
            {
                test: /\.(ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: './fonts/[name].[ext]'
                    }
                }
            }
        ]
    },
    mode: 'production'
};
