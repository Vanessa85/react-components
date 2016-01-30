var path = require('path');
var webpack = require('webpack');

var APP_PATH = path.resolve(__dirname);

var config = {
	entry: {
		app: path.resolve(APP_PATH, 'src/main')
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(APP_PATH, 'dist')
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		modulesDirectories: ['node_modules']
	},
	module: {
		loaders: [
			{
				test:/\.jsx?$/,
				loaders: ['babel'],
				include: path.resolve(APP_PATH, 'src')

			}
		]	
	},
	/*externals: {
		'jquery': 'jQuery',
		//'bootstrap': 'Bootstrap'
	},*/
	plugins: [
		//new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
		/*new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				//this has effect on the react lib size
				'NODE_ENV': JSON.stringify('production')
			}
		})*//*
		new webpack.ProvidePlugin({
			"jQuery": 'jquery',
			"window.jQuery": 'jquery',
			$: 'jquery',
			jquery: 'jquery'
		})*/
	]
};

module.exports = config;