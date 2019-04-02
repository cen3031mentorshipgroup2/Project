var express = require('express'),
	router = express.Router(),
	path = require('path'),
	mid = require('../middleware/mid'),
	User = require('../models/user'),
	Message = require('../models/message');

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
	//var user;
	var compat = 0;
	var counter = 0;
	User.findById(req.session.userId, { password: 0 }, function (error, user) {
		User.findOne({ username: req.query.name }, { password: 0 }, function (error, user2) {
			
			forthFunction();
			
			function firstFunction(){
				for (i = 0, leng = user.menteeinterests.length; i < leng; i++){
					if (counter === 3){
						break;
					}
					
					for (j = 0, len = user2.mentorinterests.length; j < len; j++){
						if (user.menteeinterests[i] === user2.mentorinterests[j]){
							compat = compat + 16;
							counter = counter + 1;
							break;
						}
					}
				}
				
				//compat = compat + 70;
				return;
			};
			
			async function secondFunction(){
				await firstFunction();
				if (Math.abs(user.zipcode - user2.zipcode) < 200){
					compat = compat + 22;
				}
				//compat = compat +30;
				return;
			};
			
			
			
			async function thirdFunction(){
				await secondFunction();
				if (user.prefeducation < user2.education){
					compat = compat + 30;
				}
					
			};
			
			async function forthFunction(){
				await thirdFunction();
				var data = {
					compatibility: compat
				};
				
				res.send(data);
			};
		});
	});
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

router.get('/messages', mid.requiresLogin, function(req,res,next) {
	var otherUser = req.query.name;
	User.findById(req.session.userId, function(error, user) {
		Message.find({$or:[{from: user.username, to: otherUser}, {from: otherUser, to: user.username}]}, null, {sort: {date: -1}}, function(error, messages) {
			if(error || !messages) {
				return res.redirect('/inbox');
			}
			else {
				return res.json(messages);
			}
		});
	});
});

router.get('/messages/all', mid.requiresLogin, function(req,res,next) {
	User.findById(req.session.userId, function(error, user) {
		Message.find({$or:[{from: user.username}, {to: user.username}]}, function(error, messages) {
			if(error || !messages) {
				return res.redirect('/inbox');
			}
			else {
				return res.json(messages);
			}
		});
	});
});

router.get('/send', mid.requiresLogin, function(req,res,next) {
	var username = req.query.name;
	var message = req.query.message;
	User.findById(req.session.userId, function(error, from) {
		if(error || !from) {
			return res.redirect('/inbox');
		}
		else {
			User.findOne({username: username}, function(err, to) {
				if(err || !to) {
					return res.redirect('/inbox');
				}
				else {
					var data = {
						from: from.username,
						to: to.username,
						message: message
					};
					Message.create(data, function(errr, data) {
						return res.redirect('/inbox');
					});
				}
			});
		}
	});
});

function avg(array) {
	var a = array;
	var sum = a.reduce(function(a, b) { return a + b; }, 0);
	return sum / a.length;
}

module.exports = router;