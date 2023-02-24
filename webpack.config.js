const path  = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash:8].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader:'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(css|less|sass)$/,
                use: ['style-loader','css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: true, // 自动注入静态资源
            title: 'react-app'
        })
    ]
}

module.exports = webpackConfig;