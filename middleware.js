// middleware.js
const helmet = require('helmet');
const session = require('express-session');
const passport = require('./passport');
const flash = require('connect-flash'); // Add this for flash messages

module.exports = (app) => {
    // Helmet security headers
    app.use(helmet());

    // Session configuration
    app.use(
        session({
            secret: 'test', // Replace with a strong secret in production!
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false }, // Set to true if using HTTPS in production
        })
    );

    // Connect-flash for flash messages
    app.use(flash());

    // Passport middleware initialization
    app.use(passport.initialize());
    app.use(passport.session());

    // Custom middleware to inject messages into locals (for views)
    app.use(function(req, res, next) {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error'); // For passport errors
        next();
    });
};


// Authentication middleware functions
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { // Check if the user is authenticated
      return next(); // If authenticated, proceed to the next middleware/route handler
    }
    req.flash('error_msg', 'Please log in to view this resource');
    res.redirect('/auth/login'); // If not authenticated, redirect to the login page
  }
  
  function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
      return next();
    }
    req.flash('error_msg', 'You are not authorized to view this resource');
    res.redirect('/hello'); // or any other appropriate route
  }
  
  module.exports.isAuthenticated = isAuthenticated;
  module.exports.isAdmin = isAdmin;
  
