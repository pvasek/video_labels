var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// sort_by((chunks[*].modules[*].{ id: id, name: name, time: profile.building })[*], &time)
module.exports = {
    devtool: 'cheap-module-eval-source-map',
    cache: true,    
    entry: {
        scripts: [
            './_app/index.tsx'
        ],
        stylesheets: [
            './_stylesheets/index.js'
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.less', '.css']
    },
    output: {
        path: path.join(__dirname, 'wwwroot/assets/dev/app'),
        publicPath: '/assets/dev/app',
        filename: '[name].js'
    },
    plugins: [ 
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true
        })
    ],
    module: {
        rules: [{
                test: /\.ts(x?)$/,
                use: 'ts-loader?' + JSON.stringify({                    
                    transpileOnly: false,
                    logInfoToStdOut: true
                }),
                include: [
                    path.resolve(__dirname, "_app")
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], 
                include: [
                    path.resolve(__dirname, "_stylesheets")
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'url-loader?limit=8192'
            },
            {
                test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
                use: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: "url-loader?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: "file-loader"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: "url-loader?limit=10000&mimetype=image/svg+xml"
            }
        ]
    },    
    devServer: {
        overlay: {
            warnings: true,
            errors: true
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    }
};