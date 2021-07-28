/* 
    loader: 1.下载 2.使用(配置loader)
    plugins:1.下载 2.引入 3.使用
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js'
    },

    plugins: [
        //功能：默认会创建一个空的HTML，自动引入打包输出的所有资源
        new HtmlWebpackPlugin({
            //复制 './src/index.html' 文件，并自动引入打包输出的所有资源(JS/CSS)
            template: './src/index.html'
        })
    ],
    mode: 'development',
};