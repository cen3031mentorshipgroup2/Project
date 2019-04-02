var express = require('express'), 
    router = express.Router(),
    path = require('path'),
    mid = require('../middleware/mid'),
    User = require('../models/user'),
    bcrypt = require('bcrypt');
    


router.get('/', mid.requiresLogin, mid.noGoogle, function(req,res,next) {
  return res.sendFile(path.join(__dirname + '/../../client/pages/completeProfile.html'));
});

router.post('/', mid.requiresLogin, mid.noGoogle, function(req,res,next) {
  if(req.body.username && req.body.password && req.body.confpassword && (req.body.password == req.body.confpassword)) {
    var data = {
      username: req.body.username,
      password: req.body.password,
      googleSignIn: true
    }

    bcrypt.hash(data.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      consolelog(hash);
      data.password = hash;
      User.updateOne({_id: req.session.userId}, data, {upsert: true}, function(error, result) {
        if(error) {
          return res.redirect('/completeProfile');
        }
        else {
          return res.redirect('/');
        }
      });
    });
  }
  else {
    return res.redirect('/completeProfile');
  }
});

module.exports = router;