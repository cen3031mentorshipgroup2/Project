var express = require('express'), 
    router = express.Router(),
    path = require('path'),
    mid = require('../middleware/mid'),
    User = require('../models/user');
    


router.get('/', mid.requiresLogin, mid.noProfile, function(req,res,next) {
  return res.sendFile(path.join(__dirname + '/../../client/pages/profileSurvey.html'));
});

router.post('/', mid.requiresLogin, mid.noProfile, function(req,res,next) {
  if(req.body.firstName && req.body.lastName) {
    var data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      zipcode: req.body.zipcode,
      gender: req.body.gender,
      phonenumber: req.body.phoneNumber,
      bio: req.body.bio,
      hasProfile: true
    }
    console.log(data);
    
    User.updateOne({_id: req.session.userId}, data, {upsert: true}, function(error, result) {
      console.log(error);
      if(error) {
        return res.redirect('/logout');
      }
      else {
        return res.redirect('/');
      }
    });
  }
  else {
    return res.redirect('/');
  }
});

module.exports = router;