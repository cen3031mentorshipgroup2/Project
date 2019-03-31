var express = require('express'),
    router = express.Router(),
    path = require('path'),
    User = require('../models/user');

function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        next();
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
        next();
    }
}

function isMentee(req,res,next) {
    User.findById(req.session.userId, function(error, user) {
        if(error || !user) {
            return res.redirect('/logout');
        }
        else if(user.isMentee) {
            next();
        }
        else {
            return res.redirect('/mentee/survey');
        }
    });
}

function isMentor(req,res,next) {
    User.findById(req.session.userId, function(error, user) {
        if(error || !user) {
            return res.redirect('/logout');
        }
        else if(user.isMentor) {
            next();
        }
        else {
            return res.redirect('/mentor/survey');
        }
    });
}

exports.isMentee = isMentee;
exports.isMentor = isMentor;
exports.requiresLogin = requiresLogin;
exports.isLoggedIn = isLoggedIn;