var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    listingsRouter = require('../routes/listings.server.routes'),
	  landingRouter = require('../routes/landing.routes'),
	  loginRouter = require('../routes/login.routes'),
    registerRouter = require('../routes/register.routes'),
    homeRouter = require('../routes/home.routes'),
	  files = '/../../client/pages'

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);
  var db = mongoose.connection;
  
  //Verify Database connected
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
	  console.log('Connected to DB');
  });

  //initialize app
  var app = express();

  //Mongo-connect to store sesssions
  app.use(session({
    secret: 'group2',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  }));

  //body parsing middleware 
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  
  /**TODO
  Serve static files */
  app.use('/', express.static(path.join(__dirname + files)));
  

  /**Define each router for various pages, 
  remember that this mounts the directory so 
  in that that router '/' = whatever is in the use here,
  require declared at top of this file**/
  app.use('/', landingRouter);
  app.use('/login', loginRouter);
  app.use('/register', registerRouter);
  app.use('/home', homeRouter);
  //app.use('/api/listings', listingsRouter);


  /**TODO 
  Go to homepage for all routes not specified */ 
  app.use(function(req, res) {
	  res.redirect('/');
  });

  return app;
};  