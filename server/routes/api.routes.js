var express = require('express'),
	router = express.Router(),
	path = require('path'),
	mid = require('../middleware/mid'),
	User = require('../models/user');

router.get('/currentuser', mid.requiresLogin, function (req, res, next) {
	User.findById(req.session.userId, { password: 0 }, function (error, user) {
		if (error || !user) {
			return res.redirect('/login');
		}
		else {
			return res.json(user);
		}
	});
});

router.get('/profile', mid.requiresLogin, function (req, res, next) {
	User.findOne({ username: req.query.name }, { password: 0 }, function (error, user) {
		if (error || !user) {
			return res.redirect('/');
		}
		else {
			return res.json(user);
		}
	});
});

router.get('/rating', mid.requiresLogin, function (req, res, next) {
	var name = req.query.name;
	User.findOne({ username: name }, function (error, user) {
		var data = {
			rating: 5
		};
		if (error || !user) {
			data.rating = -1;
			return res.send(data);
		}
		else {
			var ratings = user.ratings;
			if (typeof ratings == "undefined") {
				return res.send(data);
			}
			else {
				if (ratings == 0) {
					return res.send(data);
				}
				else {
					data.rating = avg(ratings);
					return res.send(data);
				}
			}
		}
	});
});

router.get('/compatibility', mid.requiresLogin, function (req, res, next) {
	data = {
		compatibility: 100
	};
	return res.send(data);
});

router.get('/mentees', mid.requiresLogin, function (req, res, next) {
	User.find({ isMentee: true }, { password: 0 }, function (error, user) {
		if (error) {
			return res.redirect('/');
		}
		else {
			return res.send(user);
		}
	});
});

router.get('/mentors', mid.requiresLogin, function (req, res, next) {
	User.find({ isMentor: true }, { password: 0 }, function (error, user) {
		if (error) {
			return res.redirect('/');
		}
		else {
			return res.send(user);
		}
	});
});

function avg(array) {
	var a = array;
	var sum = a.reduce(function(a, b) { return a + b; }, 0);
	return sum / a.length;
}

module.exports = router;