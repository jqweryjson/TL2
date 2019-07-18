'use strict';

const webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    fs = require('fs');

let entry = {
    common: './common'
}

if (fs.existsSync(__dirname + '/assets/mobile.js')) {
    entry.mobile = './mobile';
}

module.exports = function(env) {
    let config = {
        context: __dirname + '/assets',
        entry: entry,
        output: {
            path: __dirname + '/public',
            filename: '[name].bundle.js',
            chunkFilename: '[name].[chunkhash].js',
            library: '[name]',
            publicPath: '/bundles/webpack/'
        },
        devtool: 'source-map',
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }],
            noParse: function(content) {
                return /cropperjs|fabric.js/.test(content);
            }
        },
        resolve: {
            modules: [
                __dirname + '/public/node_modules',
                __dirname + '/assets/blocks',
                'node_modules'
            ]
        },
        plugins: [
            new CleanWebpackPlugin([__dirname + '/public/bundles/webpack/']),
            // new webpack.SourceMapDevToolPlugin({
            //     filename: '[name].bundle.map',
            //     // exclude: ['vendor.bundle.js']
            // }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: "vendor",
            //     minChunks: function(module) {
            //         return module.size() > 30000 && module.context && module.context.indexOf("node_modules") !== -1;
            //     }
            // })
        ],
    };

    if (env === 'production') {
        config.plugins.push(
            new UglifyJsPlugin({
                sourceMap: true,
                cache: true,
                uglifyOptions: {
                  mangle: {
                    safari10: true,
                  },
                },
            })
        );
    }

    return config;
};
