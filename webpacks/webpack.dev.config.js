const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config");


const webpackDevConfig = merge(webpackBaseConfig, {
    mode: 'development',
    devServer: {
        port: 8080, // 服务端口号
        compress: false, // gzip压缩,开发环境不开启,提升热更新速度
        hot: true, // 开启热更新，后面会讲react模块热替换具体配置
    }
}) 

module.exports = webpackDevConfig;