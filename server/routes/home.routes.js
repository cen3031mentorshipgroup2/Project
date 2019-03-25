var express = require('express'), 
    router = express.Router(),
	path = require('path'),
	mid = require('../middleware/mid');


router.get('/', mid.requiresLogin, function(req,res) {
	return res.sendFile(path.join(__dirname + '/../../client/pages/home.html'));
});

module.exports = router;