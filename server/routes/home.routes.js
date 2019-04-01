var express = require('express'), 
    router = express.Router(),
	path = require('path'),
	mid = require('../middleware/mid');

router.get('/', mid.requiresLogin, mid.hasProfile, function(req,res,next) {
	return res.sendFile(path.join(__dirname + '/../../client/pages/home.html'));
});

module.exports = router;