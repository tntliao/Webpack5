const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //单入口
    // entry: './src/js/index.js',
    entry: {
        //多入口：有一个入口，最终输出就有一个bundle
        index: './src/js/index.js',
        test: './src/js/test.js'
    },
    output: {
        //[name]：取文件名 --> 就是引入文件路径前面的属性
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true, //去除空格
                removeComments: true //去除注释
            }
        })
    ],
    mode: 'production',
    /* 
        1.可以将node_modules中代码单独打包一个chunk最终输出
        2.自动分析多入口chunk中，有没有公共的样式，如果有会打包成单独一个chunk
     */
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}