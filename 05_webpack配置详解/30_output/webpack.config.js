const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        //文件名称(指定名称+目录)
        filename: 'js/[name].js',
        //输出文件目录(将来所有的资源输出的公共目录)
        path: resolve(__dirname, 'build'),
        //所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
        // publicPath: '/',
        chunkFilename: 'js/[name]_chunk.js' //非入口chunk的名称
    },
    plugins: [new HtmlWebpackPlugin()],
    mode: 'development'
}