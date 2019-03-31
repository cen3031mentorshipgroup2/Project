var express = require('express'),
  router = express.Router(),
  path = require('path'),
  mid = require('../middleware/mid'),
  User = require('../models/user');

router.get('/', function(req,res,next) {
  User.findOne({_id: req.session.userId}, function(error, user) {
    if(error) {
      return res.redirect('/');
    }
    else {
      return res.redirect('/profile/' + user.username);
    }
  });
});

router.get('/:name', function(req,res) {
  User.findOne({username: req.params.name}, function(error, user) {
    if(error || !user) {
      res.redirect('/');
    }
    else {
      return res.sendFile(path.join(__dirname + '/../../client/pages/profile.html'));
    }
  });
});

module.exports = router;