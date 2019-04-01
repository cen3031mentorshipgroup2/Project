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


module.exports = router;