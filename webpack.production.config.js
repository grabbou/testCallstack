const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpack = require('webpack');

module.exports = {
    context: `${__dirname}/src`,
    entry: [path.resolve(__dirname, 'src/main')],
    resolve: {
        root: path.resolve(__dirname, 'src'),
        extensions: ['', '.js', '.jsx', '.styl'],
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:7000/',
        filename: 'app.[hash].js',
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('stylus', 'css-loader!stylus-loader'),
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css-loader!sass-loader']),
            },
            {
                test: /\.json$/,
                loader: 'json',
            },
            {
                test: /\.woff(\d+)?$/,
                loader: 'url-loader?mimetype=application/font-woff',
            },
            {

                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=images/[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
                ],

            },
            { test: /\.ttf$/, loader: 'file-loader' },
        ],
    },
    plugins: [
        new ExtractTextPlugin('app.[hash].css', {
            allChunks: true,
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            production: true,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true,
            },
        }),
        new webpack.optimize.DedupePlugin(),

    ],
};
