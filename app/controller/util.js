var Config = require('../../config');
var URL = require('url');
var csrf = require('csurf');

var util = {};

util.StoreIntentUrl = function(req, res, next){
	if(req.query.intentUrl){
		req.session.intentUrl = decodeURIComponent(req.query.intentUrl);
	}
	next();
}

util.RetrieveIntentUrl = function(req){
	if(req.session.intentUrl){
		var url = req.session.intentUrl;
		var urlParse = URL.parse(url);
		delete req.session.intentUrl;
		//avoid explicit specify hostname
		if(!urlParse.hostname) return url;
		else return "/";
	}
	else return "/";
};

util.RandomInt = function(max) {
	return Math.floor(Math.random() * Math.floor(max));
};

util.CheckLogin = function (req, res, next) {
	if (req.isAuthenticated()) return next();
	var isAjax = req.xhr;
	if(isAjax) res.send({"status":"fail","message":"please login"});
	else res.redirect("/auth/login?intentUrl="+encodeURIComponent(req.originalUrl));
};

util.CheckAdmin = function (req, res, next) {
	if(req.user){
		if (req.user.authType == "admin") return next();
	}
	var isAjax = req.xhr;
	if(isAjax) res.send({"status":"fail","message":"permission denied"});
	else res.redirect("/?message="+encodeURIComponent("權限不足"));
};

util.FailRedirect = function(req, res, redirect, message){
	var isAjax = req.xhr;
	if(isAjax) return res.send({"status":"fail","message":message});
	else return res.redirect(redirect+"?message="+encodeURIComponent(message));
};


util.CSRF = csrf();

module.exports = util;