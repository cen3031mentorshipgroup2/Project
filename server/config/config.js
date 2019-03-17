//This file holds any configuration variables we may need 
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri: 'mongodb://admin:group2@ds031691.mlab.com:31691/mentorshipgroup2', //place the URI of your mongo database here.
  }, 
  port: process.env.PORT
};