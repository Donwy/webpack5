const webpackBaseConfig = require('./webpack.base.config');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { webpack } = require('webpack');

const webpackProdConfig = merge(webpackBaseConfig, {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({                      // 抽离css插件
            filename: '[name].[contenthash:8].css',          
            chunkFilename: '[id].css'
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,                     //开启多线程压缩（true/ 4  os.cpus().length -1）
                extractComments: false,             //去掉额外生成的注释文件
            })
        ],
        splitChunks: {                              //代码分割
            chunks: 'all',                          //指明要分割的代码类型，async 异步，inital 同步，all 所有
            name: 'vendor',
            minChunks: 1,                           //最小分割出来一个
            cacheGroups: {                          //缓存组，用于自定义设置，优先级高于上面
                vendor: {
                    filename: 'vendor2.[contenthash:6].js',
                    test: /node_modules/            //限定提取范围
                }
            }
          }
    }
});

module.exports = webpackProdConfig;