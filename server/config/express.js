var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes'),
	files = '/../../client'

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware 
  app.use(bodyParser.json());

  
  /**TODO
  Serve static files */
  app.use('/', express.static(path.join(__dirname + files)));
  

  /**TODO 
  Use the listings router for requests to the api */
  app.use('/api/listings', listingsRouter);


  /**TODO 
  Go to homepage for all routes not specified */ 
  app.use(function(req, res) {
	  res.redirect('/');
  });
  

  return app;
};  