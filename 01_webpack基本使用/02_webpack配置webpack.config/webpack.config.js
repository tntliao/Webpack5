const path = require('path');

module.exports = {
    mode: 'development',
    /* 
        entry配置：

            chunk --> 块

            1.entry: './src/index.js'
                以这个文件为入口文件

            2.Arrar  entry: ['./src/index.js', './src/main.js']
                多个入口文件，输出一个文件
            
            3.Object entry:{
                one : './src/index.js',
                two : './src/main.js'
            }
                多个入口文件，输出多个文件，文件名为属性名(one,two)
                output需要设置
                    output: {
                        filename: '[name].js',
                        path: path.resolve(__dirname, 'dist')
                    }
     */
    // entry: './src/index.js',
    // entry: ['./src/index.js', './src/main.js'],
    entry: {
        one: './src/index.js',
        two: './src/main.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
};