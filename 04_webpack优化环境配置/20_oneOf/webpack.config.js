const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//定义nodejs环境变量：决定使用browserslist的那个环境
process.env.NODE_ENV = 'production';

//复用loader
const commmonCssLoader = [
    MiniCssExtractPlugin.loader, //提取css成单独文件
    'css-loader',
    {
        //还需要在package.json中定义browserslist
        loader: {
            ident: 'postcss', //css兼容处理
        }
    }
];

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_module/,
                loader: 'eslint-loader',
                //优先执行
                enforce: 'pre',
                options: {
                    //自动修改eslint的错误
                    fix: true
                }
            },
            {
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [...commmonCssLoader]
                    },
                    {
                        test: /\.less$/,
                        use: [...commmonCssLoader]
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/, //排除这个文件
                        loader: 'babel-loader',//js兼容性处理
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage', //按需加载
                                        corejs: { version: 3 },
                                        targets: {
                                            chrome: '60',
                                            firefox: '50'
                                        }
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        test: /\.(jpg|png|gif)/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: '[hash:10].[ext]',
                            outputPath: 'imgs',
                            esModule: 'false' //关闭es6语法
                        }
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader'
                    },
                    {
                        exclude: /\.(js|css|less|html|jpg|png|gif)/,
                        loader: 'file-loader',
                        options: {
                            outputPath: 'media'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        }),
        new OptimizeCssAssetsPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            }
        })
    ],
    mode: 'production'
}