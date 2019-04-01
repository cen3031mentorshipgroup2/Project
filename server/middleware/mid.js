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
        else if(user.isMentee == true) {
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
        else if(user.isMentor == true) {
            next();
        }
        else {
            return res.redirect('/mentor/survey');
        }
    });
}

function hasProfile(req,res,next) {
    User.findById(req.session.userId, function(error, user) {
        if(error || !user) {
            return res.redirect('/logout');
        }
        else if(user.hasProfile == true) {
            next();
        }
        else {
            return res.redirect('/profileSurvey');
        }
    });
}

function noProfile(req,res,next) {
    User.findById(req.session.userId, function(error, user) {
        if(error || !user) {
            return res.redirect('/logout');
        }
        else if(user.hasProfile == true) {
            return res.redirect('/');
        }
        else {
            next();
        }
    });
}

exports.hasProfile = hasProfile;
exports.noProfile = noProfile;
exports.isMentee = isMentee;
exports.isMentor = isMentor;
exports.requiresLogin = requiresLogin;
exports.isLoggedIn = isLoggedIn;