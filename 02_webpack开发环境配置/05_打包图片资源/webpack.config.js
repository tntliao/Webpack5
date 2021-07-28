const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                //要使用多个loader处理使用use
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        // 下载 url-loader 依赖 file-loader
                        loader: 'url-loader',
                        options: {
                            /* 
                                图片大小小于8kb，就会被base64处理
                                优点：减少请求数量(减少服务器压力)
                                缺点：图片体积会更大(文件请求数度更慢)
                             */
                            // esModule: false,
                            limit: 8192,
                            /* 
                                给图片进行重命名
                                [hash:10]去突破的hash的前10位
                                [ext]取文件原来扩展名
                             */
                            name: '[hash:10].[ext]',
                        },
                    }
                ]
            },
            /* start */
            { test: /\.jpg$/, use: ["file-loader"] },
            { test: /\.png$/, use: ["url-loader?mimetype=image/png"] }
        ],
    },
    output: {
        publicPath: "http://cdn.example.com/[hash]/",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        })
    ],
    /* end */
    mode: 'development',
}