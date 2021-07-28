/*
    webpack.config.js webpack的配置文件
        作业:指示 webpack 干哪些活(当你运行 webpack，会加载里面的配置)

        所有构建工具都是基于node.js平台运行的~模块化采用commonjs
 */

const { resolve } = require("path");
const { output } = require("../02_webpack配置webpack.config/webpack.config");

module.exports = {
    //webpack配置
    //入口文件
    entry: './src/index.js',
    //输出
    output: {
        //输出的文件名
        filename: 'built.js',
        //输出的路径
        //__dirname nodejs的变量，代表当前文件的目录绝对路径
        path: resolve(__dirname, 'build'),
    },
    //loader的配置
    module: {
        rules: [
            //详细loader配置
            //不同文件必须配置不同loader处理
            {
                //匹配哪些文件
                test: /\.css$/,
                use: [
                    //use数值中loader执行顺序：从右到左，从下往上，依次执行
                    //创建style标签，将js中的样式资源插入进行，添加到head中生效
                    'style-loader',
                    //将css文件变成commonjs模块加载js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
        ]
    },
    //plugins的配置
    plugins: [
        //详细plugins的配置
    ],
    //模式
    mode: 'development',//开发模式，不不压缩
    // mode:'production', //生产模式，压缩
}