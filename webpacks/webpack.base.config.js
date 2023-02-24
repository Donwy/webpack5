const path  = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const webpackBaseConfig = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash:8].js',
        path: path.resolve(__dirname, '../build'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: /src/,
                use: [{
                    loader: 'babel-loader',                 // es6 转为es5，可使用cacheDirectory  提速
                    options: {
                        presets: [
                            '@babel/preset-env' ,  
                            '@babel/preset-react'          //允许使用react 中的jsx语法          
                        ]
                    }
                }]
            },
            {
                test: /\.(c|sa|le|sc)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',                 //将 CSS 插入到 HTML 页面中的 <style> 标签中。
                    'css-loader'                       // 解析 CSS 文件，并处理其中的依赖关系
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: true, // 自动注入静态资源
            title: 'react-app'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
          })
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
}



const fileLoader = [{
    test: /\.(png|gif|jpg|svg)$/,      //file-loader 可以解析项目中的 url 引入（不仅限于 css）
    use: [                             //根据我们的配置，将图片拷贝到相应的路径，修改打包后文件引用路径，使之指向正确的文件
        {
            loader:'file-loader',
            options: {
                name: 'static/[name].[contenthash:8].[ext]'   //输出
            }
        }
    ]
}];

const urlLoader = [{
    test: /\.(png|gif|jpg|svg)$/,
    use: [
        {
            loader:'url-loader',
            options: {
                limit: 10 * 1024,                        //大于10kb的打包到静态文件，小于10kb进行base64转码
                name: 'static/[name].[contenthash:8].[ext]'
            }
        }
    ]                 
}];


const fontfileLoader = [{
    test: /\.(eot|ttf|woff|woff2|otf|font)$/,      //字体文件不能使用base64转码
    use: [                         
        {
            loader:'url-loader',
            options: {
                name: 'fonts/[name].[contenthash:8].[ext]'   //输出
            }
        }
    ]
}];



const assetLoader = [{
    test: /\.(png|jpe?g|gif)/,
    type: 'asset',                        //   'asset/resource'，'asset/inline', 'asset/raw'
    parser: {
        dataUrlCondition: { 
            maxSize: 10 * 1024
        }
    },
    generator: {
        filename: 'images/[name].[hash:6].[ext]',
        // publicPath: 'http://127.0.0.1:51405/'
    }
}]

const assetfontLoader = [{
    test: /\.(eot|ttf|woff|woff2|otf|font)/,
    type: 'asset',                        //   'asset/resource'，'asset/inline', 'asset/raw'
    parser: {
        dataUrlCondition: { 
            maxSize: 10 * 1024
        }
    },
    generator: {
        filename: 'fonts/[name].[hash:6].[ext]'
    }
}]

webpackBaseConfig.module.rules = [
    ...webpackBaseConfig.module.rules,
    // ...fileLoader,
    // ...urlLoader,
    // ...fontfileLoader,
    ...assetLoader,
    ...assetfontLoader
]

module.exports = webpackBaseConfig;
