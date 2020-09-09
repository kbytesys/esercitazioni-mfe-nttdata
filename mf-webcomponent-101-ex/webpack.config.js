

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', 
    output: {
        filename: 'bundle.js', 
        path: path.resolve(__dirname, './dist'),
    },
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        index: 'index.html',
        port: 9001
    },
    module: {
        rules: [
           {
               test: /\.(png|jpg)$/,
               use: [
                   'file-loader'
               ]
           },
           {
               test: /\.css$/,
               use: [
                   'style-loader','css-loader'
               ]
           },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: ['transform-class-properties']
                    }

                }
            },
            {
                test: /\.hbs$/,
                use: {
                    loader: 'handlebars-loader'
                }
            }
        ]
    },
    plugins: [
        
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',
                path.join(process.cwd(), '/build/**/*')
            ] 
        }),
        new HtmlWebpackPlugin({
            title: 'test page',
            template: 'src/index.html'
        })
    ]
}