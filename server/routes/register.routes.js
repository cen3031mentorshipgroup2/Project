var express = require('express'), 
    router = express.Router(),
	path = require('path'),
	User = require('../models/user'),
	mid = require('../middleware/mid');

router.get('/', mid.isLoggedIn, function(req,res) {
	return res.sendFile(path.join(__dirname + '/../../client/pages/signup.html'));
});

router.post('/', function(req,res,next) {
	if(req.body.password !== req.body.passwordConf) {
		var err = new Error('Passwords do not match.');
		err.status = 400;
		res.send("Passwords do not match!");
		return next(err);
	}
	if(req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
		var userData = {
			email: req.body.email,
			username: req.body.username,
            password: req.body.password,
            ismentee: false
		}

		User.create(userData, function(error, user) {
			if(error) {
				return next(error);
			}
			else {
                req.session.userId = user._id;
                req.session.ismentee = user.ismentee;
				return res.redirect('/profile');
			}
		});
	}
	else {
		var err = new Error('All fields required.');
		err.status = 400;
		return next(err);
	}
});

module.exports = router;