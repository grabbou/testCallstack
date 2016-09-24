 var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpack = require("webpack");


const port = 5000;
const host = 'localhost';

module.exports = {
    context: __dirname +  "/src",
    //'webpack/hot/dev-server',
    entry: [ path.resolve(__dirname, 'src/main')],
    resolve: {
        root: path.resolve(__dirname, 'src'),
        extensions: ['', '.js', '.jsx', '.scss'],
    },
    port: port,
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath : 'http://' + host + ':' + port + '/',
        filename: 'bundle.js',
    },
    module: {
	    loaders: [
            {
    	      test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
    	            exclude: /(node_modules|bower_components)/,
              loader: 'babel' // The module to load. "babel" is short for "babel-loader"
    	    },
            {
                test: /\.css$/, // Only .css files
                loader: 'style!css' // Run both loaders
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader',
            },
            {
                test: /\.woff(\d+)?$/,
                loader: 'url-loader?mimetype=application/font-woff'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            { test: /\.ttf$/,    loader: "file-loader" }
        ]
       
	},
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),

    ],
    devServer: {
        port: port,
      // proxy: {
      //   '*': config.proxy
      // }
    }
};
