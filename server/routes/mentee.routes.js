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
  var x = req.body['timeZone[]'];
  console.log(x);
  return res.redirect('/');
});


module.exports = router;