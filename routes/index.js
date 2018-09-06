/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var express = require('express');	// Read Config
var prefix = process.env.URL_PREFIX;
var wxAppId = process.env.WX_APPID;
var wxAppSecret = process.env.WX_APPSECRET;

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api'),
};

const wechatConfig = {
	// 第一个为设置网页授权回调地址
	wechatRedirectUrl: 'https://www.arena-x.cn/h5/sports/wechat/oauth-callback',
	appId: wxAppId,
	appSecret: wxAppSecret,
};

var Wechat = require('wechat-jssdk');
const wx = new Wechat(wechatConfig);

// Setup Route Bindings
exports = module.exports = function (app) {


	// Views
	app.get(prefix + '/', routes.views.index);
	app.get(prefix + '/personal', routes.views.personal);

	// Static Files
	app.use(prefix + '/', express.static('public'));
	// api
	app.get(prefix + '/api/getinfo', keystone.middleware.api, routes.api.getinfo.supporters);
	
	app.get(prefix + '/get-signature', function (req, res) {
		wx.jssdk.getSignature(req.query.url).then(function (signatureDate) {
			res.json(signatureDate);
		});
	});

	app.get(prefix + '/api/wechat', function (req, res) {
		if (wx.jssdk.verifySignature(req.query)) {
			res.send(req.query.echostr);
			return;
		}
		res.send('error');
	});


	// callback url handler
	app.get(prefix + '/wechat/oauth-callback', function (req, res) {
		wx.oauth.getUserInfo(req.query.code)
			.then(function (userProfile) {
				console.log(userProfile);
				res.render('demo', {
					wechatInfo: userProfile,
				});
			});
	});
};
