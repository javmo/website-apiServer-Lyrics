const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

console.log(devMode)

module.exports = {
    entry: {
        index: './frontend/app.js',
        panel: './frontend/panel.js',
        songBook: './frontend/songBook.js',
        categoryABM: './frontend/categoryABM.js'
    },

    output: {
        path: path.join(__dirname, 'backend/public'),
        filename: 'js/[name].bundle.js'
    },
    /*mode: 'development',*/

    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './frontend/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css'
        }),
        new HtmlWebpackPlugin({
            template: './frontend/panel.html',
            filename: 'panel.html',
            chunks: ['panel']
        }),
        new HtmlWebpackPlugin({
            template: './frontend/songBook.html',
            filename: 'songBook.html',
            chunks: ['songBook']
        }),
        new HtmlWebpackPlugin({
            template: './frontend/categoryABM.html',
            filename: 'categoryABM.html',
            chunks: ['categoryABM']
        })
    ],
    devtool: 'source-map'
};