
/* Dependencies */
var mongoose = require('mongoose'), 
Listing = require('../models/user.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial 
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a listing */

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /** TODO **/
  /* Your code here */
  
  /*Listing.find({}, function(err, listings) {
  if (err) throw err;

  // object of all the users
  console.log(listings);
});*/

  Listing.find({},function(err, listing) {
    if(err) {
      res.status(400).send(err);
    }
	
	else {
	   res.json(listing);
	   //console.log(listing.length)
       res.status(200).end('OK');
    }
	
  }).sort('code').exec(function(err, docs) {});
};
