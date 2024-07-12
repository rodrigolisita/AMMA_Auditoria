// middleware.js
const helmet = require('helmet');
const session = require('express-session');

module.exports = (app) => {  // Pass the app instance to the middleware function

    // Helmet security headers
    app.use(helmet());

    // Session configuration
    app.use(session({
        secret: 'test', // Replace with a strong secret
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Set to true if using HTTPS in production
    }));
};