var express = require('express'),
    router = express.Router(),
    path = require('path'),
    User = require('../models/user');

function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        googleCheck(req,res,next);
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

function isMentee(req, res, next) {
    User.findById(req.session.userId, function (error, user) {
        if (error || !user) {
            return res.redirect('/logout');
        }
        else {
            if (user.isMentee) {
                next();
            }
            else {
                return res.redirect('/mentee/survey');
            }
        }
    });
}

function isMentor(req, res, next) {
    User.findById(req.session.userId, function (error, user) {
        if (error || !user) {
            return res.redirect('/logout');
        }
        else {
            if (user.isMentor) {
                next();
            }
            else {
                return res.redirect('/mentor/survey');
            }
        }
    });
}

function hasProfile(req, res, next) {
    User.findById(req.session.userId, function (error, user) {
        if (error || !user) {
            return res.redirect('/logout');
        }
        else {
            if (user.hasProfile) {
                next();
            }
            else {
                return res.redirect('/profileSurvey');
            }
        }
    });
}

function noProfile(req, res, next) {
    User.findById(req.session.userId, function (error, user) {
        if (error || !user) {
            return res.redirect('/logout');
        }
        else {
            if (user.hasProfile) {
                return res.redirect('/');
            }
            else {
                next();
            }
        }
    });
}

function googleCheck(req,res,next) {
    User.findById(req.session.userId, function (error, user) {
        if (error || !user) {
            return res.redirect('/logout');
        }
        else {
            if (!user.googleSignIn && req.originalUrl != "/completeProfile") {
                return res.redirect('/completeProfile');
            }
            else {
                next();
            }
        }
    });
}

function noGoogle(req,res,next) {
    User.findById(req.session.userId, function (error, user) {
        if (error || !user) {
            return res.redirect('/logout');
        }
        else {
            if (!user.googleSignIn) {
                next();
            }
            else {
                res.redirect('/');
            }
        }
    });
}

exports.hasProfile = hasProfile;
exports.noGoogle = noGoogle;
exports.noProfile = noProfile;
exports.isMentee = isMentee;
exports.isMentor = isMentor;
exports.requiresLogin = requiresLogin;
exports.isLoggedIn = isLoggedIn;