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
                test: /\.css$/,
                use: [...commmonCssLoader]
            },
            {
                test: /\.less$/,
                use: [...commmonCssLoader]
            },
            /*
                注册来讲，一个文件只能被一个loader处理
                当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
                先执行eslint 在执行 babel 
             */
            {
                //在package.json中eslintConfig --> airbnb
                test: /\.js$/,
                exclude: /node_modules/,
                //优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
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