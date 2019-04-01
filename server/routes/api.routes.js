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

function avg(array) {
	var a = array;
	var sum = a.reduce(function(a, b) { return a + b; }, 0);
	return sum / a.length;
}

module.exports = router;

/*var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  hasProfile: {
    type: Boolean,
    required: true
  },
  isMentee: {
    type: Boolean,
    required: true
  },
  isMentor: {
    type: Boolean,
    required: true
  },
  googleSignIn: {
    type: Boolean,
    required: true
  },
  menteeinterests: {
    type: [String]
  },
  mentorinterests: {
    type: [String]
  },
  zipcode: {
    type: Number
  },
  timezone: {
    type: String
  },
  preferredEducation: {
    type: String
  },
  ratings: {
    type: [Number]
  },
  prefeducation: {
    type: String  
  },
  education : {
    type: String
  },
  communicationMethod: {
    type: [String]
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  gender: {
    type: String
  },
  phonenumber: {
    type: Number
  },
  bio: {
    type: String
  },
  friends: {
    type: [String]
  },
  mentors: {
    type: [String]
  },
  mentees: {
    type: [String]
  }
});

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//authenticate with google
UserSchema.statics.authenticateGoog = function (email, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }

      return callback(null, user);

    });
}


//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


var User = mongoose.model('User', UserSchema);
module.exports = User;*/