var express = require('express'),
  router = express.Router(),
  path = require('path'),
  mid = require('../middleware/mid'),
  User = require('../models/user');

router.get('/', mid.requiresLogin, mid.hasProfile, mid.isMentor, function(req,res,next) {
	return res.sendFile(path.join(__dirname + '/../../client/pages/mentor.html'));
});

router.get('/survey', mid.requiresLogin, mid.hasProfile, function(req,res,next) {
  return res.sendFile(path.join(__dirname + '/../../client/pages/mentorSurvey.html'));
});

router.post('/survey', mid.requiresLogin, mid.hasProfile, function(req,res,next) {
  var x = req.body.timeZone;
  console.log(x);
  if(req.body['method[]'] && req.body.timeZone && req.body['topics[]'] && req.body.level) {
    var data = {
      communicationMethod: req.body['method[]'],
      timezone: req.body['timeZone'],
      mentorinterests: req.body['topics[]'],
      education: req.body['level'],
      isMentor: true
    }

    User.updateOne({_id: req.session.userId}, data, {upsert: true}, function(error, result) {
      if(error) {
        console.log(err);
        return res.redirect('/mentor/survey');
      }
      else {
        return res.redirect('/mentor');
      }
    });
  }
  else {
    return res.redirect('/mentor/survey');
  }
});

module.exports = router;