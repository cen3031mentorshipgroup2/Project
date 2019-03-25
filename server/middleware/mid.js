var express = require('express'),
    router = express.Router(),
    path = require('path');

function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error('You must be logged in to view this page.');
        err.status = 401;
        return res.redirect('/');
    }
}

function isLoggedIn(req, res, next) {
    if (req.session && req.session.userId) {
        return res.redirect('/home');
    } else {
        return next();
    }
}

exports.requiresLogin = requiresLogin;
exports.isLoggedIn = isLoggedIn;