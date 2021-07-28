const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            //loader的配置
            {
                //处理less资源
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                //处理css资源
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                //处理图片资源
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[hash:10].[ext]',
                            esModule: false, 
                            outputPath:'imgs'
                        }
                    }
                ]
            },
            {
                //处理html中img资源
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                }
            },
            {
                exclude: /\.(html|js|css|less|jpg|png|gif)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash:10].[ext]',
                            outputPath:'media'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        })
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 0526,
        open: true
    }
}