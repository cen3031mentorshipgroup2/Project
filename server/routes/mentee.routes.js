var express = require('express'),
  router = express.Router(),
  path = require('path'),
  mid = require('../middleware/mid'),
  User = require('../models/user');

router.get('/', mid.requiresLogin, function(req,res) {
	return res.sendFile(path.join(__dirname + '/../../client/pages/mentee.html'));
});


module.exports = router;