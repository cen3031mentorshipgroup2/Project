var express = require('express'),
	router = express.Router(),
	path = require('path'),
	User = require('../models/user'),
	mid = require('../middleware/mid');


router.get('/', mid.isLoggedIn, function (req, res) {
	return res.sendFile(path.join(__dirname + '/../../client/pages/login.html'));
});

router.post('/', function (req, res, next) {
	if (req.body.email && req.body.password) {
		User.authenticate(req.body.email, req.body.password, function (error, user) {
			if (error || !user) {
				var err = new Error('Wrong email or password.');
				err.status = 401;
				return next(err);
			}
			else {
                req.session.userId = user._id;
                req.session.ismentee = user.ismentee;
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



router.post('/google', function (req, res, next) {
	var token = req.body.idtoken;
	var CLIENT_ID = '538320268861-nfethi54gnu756rlidbp0ikpac58bo0o.apps.googleusercontent.com'
	const { OAuth2Client } = require('google-auth-library');
	const client = new OAuth2Client(CLIENT_ID);
	async function verify() {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
			// Or, if multiple clients access the backend:
			//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
		});
		const payload = ticket.getPayload();
		const userid = payload['sub'];
		const emailadd = payload['email'];
		// If request specified a G Suite domain:
		//const domain = payload['hd'];
		User.authenticateGoog(emailadd, function (error, user) {
			if (!user || error) {
				var userData = {
					email: emailadd,
					username: emailadd,
					password: '0'
				}

				User.create(userData, function (error, user) {
					if (error) {
						return next(error);
					}
					else {
						req.session.userId = user._id;
						return res.redirect('/profile');
					}
				});
			}
			else {
				req.session.userId = user._id;
				return res.redirect('/home');
			}
		});
	}
	verify().catch(console.error);
});

module.exports = router;