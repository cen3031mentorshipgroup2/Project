var express = require('express'), 
    router = express.Router(),
	path = require('path');


router.get('/', function(req,res) {
	return res.sendFile(path.join(__dirname + '/../../client/pages/main.html'));
});

router.get('/logout', function (req, res, next) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});


module.exports = router;