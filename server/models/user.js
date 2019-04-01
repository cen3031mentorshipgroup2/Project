var mongoose = require('mongoose');
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
    type: String,
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
  education: {
    type: String  
  },
  communicationMethod: {
    type: String
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
module.exports = User;