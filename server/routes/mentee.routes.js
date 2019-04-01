var express = require('express'),
  router = express.Router(),
  path = require('path'),
  mid = require('../middleware/mid'),
  User = require('../models/user');

router.get('/', mid.requiresLogin, mid.hasProfile, mid.isMentee, function(req,res,next) {
	return res.sendFile(path.join(__dirname + '/../../client/pages/mentee.html'));
});

router.get('/survey', mid.requiresLogin, mid.hasProfile, function(req,res,next) {
  return res.sendFile(path.join(__dirname + '/../../client/pages/menteeSurvey.html'));
});

router.post('/survey', mid.requiresLogin, mid.hasProfile, function(req,res,next) {
  if(req.body['method[]'] && req.body.timeZone && req.body['topics[]'] && req.body.level) {
    var data = {
      communicationMethod: req.body['method[]'],
      timezone: req.body['timeZone'],
      menteeinterests: req.body['topics[]'],
      prefeducation: req.body['level'],
      isMentee: true
    }

    User.updateOne({_id: req.session.userId}, data, {upsert: true}, function(error, result) {
      if(error) {
        console.log(err);
        return res.redirect('/mentee/survey');
      }
      else {
        return res.redirect('/mentee');
      }
    });
  }
  else {
    return res.redirect('/mentee/survey');
  }
});


module.exports = router;