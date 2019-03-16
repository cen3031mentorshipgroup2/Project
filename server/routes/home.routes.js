var express = require('express'), 
    router = express.Router(),
	path = require('path');


router.get('/', function(req,res) {
	return res.sendFile(path.join(__dirname + '/../../client/pages/main.html'));
});

router.get('/login', function(req,res) {
	return res.sendFile(path.join(__dirname + '/../../client/pages/login.html'));
});

router.get('/register', function(req,res) {
	return res.sendFile(path.join(__dirname + '/../../client/pages/signup.html'));
});



module.exports = router;