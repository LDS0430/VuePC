'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
//首先
const express = require('express')
const app = express()
var appData = require('../data.json') //加载本地数据文件
var getOrderList = appData.getOrderList
var getOrderListlist = appData.getOrderList.list
var getNewsList = appData.getNewsList

var login = appData.login
var getPrice = appData.getPrice
var createOrder = appData.createOrder
var apiRoutes = express.Router()
app.use('/api', apiRoutes)

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
	module: {
		rules: utils.styleLoaders({
			sourceMap: config.dev.cssSourceMap,
			usePostCSS: true
		})
	},
	// cheap-module-eval-source-map is faster for development
	devtool: config.dev.devtool,

	// these devServer options should be customized in /config/index.js
	devServer: {
		clientLogLevel: 'warning',
		historyApiFallback: true,
		hot: true,
		compress: true,
		host: HOST || config.dev.host,
		port: PORT || config.dev.port,
		open: config.dev.autoOpenBrowser,
		overlay: config.dev.errorOverlay ? {
			warnings: false,
			errors: true
		} : false,
		publicPath: config.dev.assetsPublicPath,
		proxy: config.dev.proxyTable,
		quiet: true, // necessary for FriendlyErrorsPlugin
		watchOptions: {
			poll: config.dev.poll
		},

		//然后找到devServer,在里面添加
		before(app) {
			app.get('/api/getOrderList', (req, res) => {
					res.json({

						data: getOrderList
					}) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
				}),
			app.get('/api/getOrderList/list', (req, res) => {
					res.json({

						data: getOrderList.list
					}) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
				}),
				app.get('/api/getNewsList', (req, res) => {
					res.json({

						data: getNewsList
					}) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
				}),
				app.get('/api/login', (req, res) => {
					res.json({
						data: login
					}) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
				}),
				app.get('/api/getPrice', (req, res) => {
					res.json({

						data: getPrice
					}) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
				}),
				app.get('/api/createOrder', (req, res) => {
					res.json({

						data: createOrder
					}) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
				})
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': require('../config/dev.env')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
		new webpack.NoEmitOnErrorsPlugin(),
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true
		}),
	]
})

module.exports = new Promise((resolve, reject) => {
	portfinder.basePort = process.env.PORT || config.dev.port
	portfinder.getPort((err, port) => {
		if(err) {
			reject(err)
		} else {
			// publish the new Port, necessary for e2e tests
			process.env.PORT = port
			// add port to devServer config
			devWebpackConfig.devServer.port = port

			// Add FriendlyErrorsPlugin
			devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
				compilationSuccessInfo: {
					messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
				},
				onErrors: config.dev.notifyOnErrors ?
					utils.createNotifierCallback() : undefined
			}))

			resolve(devWebpackConfig)
		}
	})
})