const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    //创建style标签,将样式放入
                    //'style-loader',
                    //这个loader取代style-loader,作用:提取js中的css成单独文件
                    MiniCssExtractPlugin.loader,
                    //将css文件整合到js文件中
                    'css-loader'
                ]
            },
            {
                /*
                    css兼容性处理：postcss --> npm i postcss-loader postcss-preset-env -D
                    帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
                    "browserslist": {
                      // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
                      "development": [
                        "last 1 chrome version",
                        "last 1 firefox version",
                        "last 1 safari version"
                      ],
                      // 生产环境：默认是看生产环境
                      "production": [
                        ">0.2%",
                        "not dead",
                        "not op_mini all"
                      ]
                    }
                */
                test: /\.css$/,
                use: ['postcss-loader']
                /* 
                    新版本需要新建postcss.config.js
                    module.exports = {
                        plugins: [
                            require('postcss-preset-env')(), 
                        ]
                    }
                 */
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            // 对输出的css文件进行重命名
            filename: 'css/built.css'
        })
    ],
    mode: 'development',
}