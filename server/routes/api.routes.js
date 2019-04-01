var express = require('express'), 
    router = express.Router(),
	path = require('path'),
	mid = require('../middleware/mid'),
	User = require('../models/user');

router.get('/currentuser', mid.requiresLogin, function(req,res,next) {
	User.findById(req.session.userId, {password: 0}, function(error, user) {
		if(error || !user) {
			return res.redirect('/login');
		}
		else {
			return res.json(user);
		}
	});
});

router.get('/profile', mid.requiresLogin, function(req,res,next) {
	User.findOne({username: req.query.name}, {password: 0}, function(error, user) {
		if(error || !user) {
			return res.redirect('/login');
		}
		else {
			return res.json(user);
		}
	});
});

module.exports = router;