const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkerPlugin = require('worker-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const packageJSON = require('./package.json');
const moment = require('moment');

module.exports = {
	entry: './main.js',
	output: {
		filename: 'game.[hash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
						],
						plugins: [ '@babel/plugin-proposal-class-properties' ],
					},
				},
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
						},
					},
				],
			},
			{
				test: /\.(svg)$/,
				use: {
					loader: 'svg-url-loader',
					options: {
						encoding: 'base64',
					},
				},
			},
			{
				test: /\.(wav|mp3|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {},
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},

		],
	},
	externals: {
		p5: 'p5',
		'planck-js': 'planck',
		sylvester: 'sylvester',
	},
	plugins: [
		new webpack.DefinePlugin({
			APP_VERSION: JSON.stringify(`v${packageJSON.version}-${moment().format('YYYYDDMMhhmm')}`),
		}),
		new CleanWebpackPlugin(),
		new WorkerPlugin({
			globalObject: 'self',
		}),
		new HtmlWebpackPlugin({
			template: './index.html',
			minify: {
				minifyCSS: true,
			},
		}),
		new MiniCssExtractPlugin({
			filename: 'main.[hash].css',
		}),
	],
	performance: {
		hints: false,
	},
};