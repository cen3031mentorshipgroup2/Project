var express = require('express'), 
    router = express.Router(),
    path = require('path'),
	  mid = require('../middleware/mid');
    


router.get('/', mid.requiresLogin, mid.noProfile, function(req,res,next) {
  return res.sendFile(path.join(__dirname + '/../../client/pages/profileSurvey.html'));
});

module.exports = router;