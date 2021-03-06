const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'buits.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            //打包其他资源(除了html/js/css资源以外的资源)
            {
                /* 
                    exclude --> 排除
                    排除css/js/html资源
                 */
                exclude: /\.(css|js|html|less)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash:10].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    /*
        development 
        development
        development
        development
        development
        develogment
        development
     */

    /* 
        开发服务器 devServer 用来自动化(自动编译，自动打开浏览器)
        特点：只会在内存中编译打包，不会有任何输出
        启动devServer指令为：npx webpack-dev-server
     */
    devServer: {
        //项目构建后路径
        contentBase: resolve(__dirname, "build"),
        //启动gzip压缩
        compress: true,
        //端口号
        port: 9000,
    },
    target: 'web'
}