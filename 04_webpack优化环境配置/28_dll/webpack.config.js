const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: resolve(__dirname, './dll'),
        filename: 'index_bundle.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        //告诉webpack那些库不参与打包，同时使用时的名称也变
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname, 'dll/mainfest.json'),
        }),
        //将某个文件打包输出出去，并在html中自动引入该资源
        // new AddAssetHtmlWebpackPlugin({
        //     filepath: join(__dirname, '/dll/jquery.js')
        // })
    ],
    mode: 'production',
};