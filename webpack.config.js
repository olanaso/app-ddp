const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: {
        login: './src/login/index.js',
        clearchannel: './src/clear-channel/index.js'
    },
    devtool: 'inline-source-map',

    devServer: {
        contentBase: './dist'
    },

    mode: 'production'
    ,

    optimization: {
    splitChunks: {
        chunks: "all",
            cacheGroups: {
            utilities: {
                test: /[\\/]src[\\/]utilities[\\/]/,
                    minSize: 0
            }
        }
    }
},
    plugins: [

    ],
    output: {
        filename: '[name].bundle.js', //let's do high performance our page using chunkhash
        publicPath: '/'
    },
    module: {
        rules: [{
            use: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            use: ['style-loader', 'css-loader'],
            test: /\.css$/
        }, {
            test: /\.(png|jp(e*)g|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8000, // Convert images < 8kb to base64 strings
                    name: 'images/[hash]-[name].[ext]'
                    // name: '[hash]-[name].[ext]'
                }
            }]
        }, {
            test: require.resolve("pace-progress"),
            loader: "imports-loader?define=>false"
        }]
    },
};