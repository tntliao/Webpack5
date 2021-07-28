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
    module: {
        rules: [
            //loader配置
            {
                test: /\.css/,
                //多个:loader用use
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                //排除node_modules下的js文件
                exclude: resolve(__dirname, 'src'),
                //只检查 src 下的js文件
                include: resolve(__dirname, 'src'),
                //优先执行
                enforce: 'pre',
                //延后执行
                // enforece: 'post',
                loader: 'eslint-loader',
                options: {}
            }, {
                //以下配置只会生效一个
                oneOf: []
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin()],
    mode: 'development'
}