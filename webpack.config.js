var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');

const BUILD_DIR = path.resolve(
	process.env.BUILD_DIR || './dist'
);

module.exports = {
	context: path.join(__dirname, 'src'),
	devtool: debug ? 'inline-sourcemap' : false,
	entry: './js/client.jsx',
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: [ 'react', 'es2015', 'stage-0' ],
					plugins: [ 'react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties' ],
				},
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [ 'style-loader', 'css-loader' ],
			},
		],
	},
	output: {
		path: BUILD_DIR,
		filename: 'client.min.js',
	},
	resolve: {
		extensions: [ '.js', '.jsx' ],
	},
	plugins: debug ? [] : [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
	],
};
