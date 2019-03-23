var express = require('express'), 
    router = express.Router(),
	path = require('path'),
	User = require('../models/user'),
	mid = require('../middleware/mid');


router.get('/', mid.isLoggedIn, function(req,res) {
	return res.sendFile(path.join(__dirname + '/../../client/pages/login.html'));
});

router.post('/', function(req,res,next) {
	if(req.body.email && req.body.password) {
		User.authenticate(req.body.email, req.body.password, function(error,user) {
			if(error || !user) {
				var err = new Error('Wrong email or password.');
				err.status = 401;
				return next(err);
			}
			else {
				req.session.userId = user._id;
				return res.redirect('/home');
			}
		});
	}



	else {
		var err = new Error('All fields required');
		err.status = 400;
		return next(err);
	}
});



router.post('/', function(req, res) {
    var email = req.body.params.email;
			User.authenticateGoog(email, function(error,user) {
			if(error || !user) {
				var err = new Error('Wrong email or password.');
				err.status = 401;
				return next(err);
			}
			else {
				req.session.userId = user._id;
				return res.redirect('/home');
			}
		    });
    res.json({'status': 200, 'msg': 'success'});
}



module.exports = router;