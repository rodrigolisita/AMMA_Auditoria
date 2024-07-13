// app.js
const express = require('express');
const app = express();
const passport = require('./passport');
const middleware = require('./middleware');
const authRoutes = require('./routes/auth'); 
const indexRoutes = require('./routes/index');
const path = require('path');
const { isAuthenticated } = require('./middleware');



// Apply middleware
middleware(app); 

// Express body parsing (add if you're not already using it)
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 

// Mount the index routes at the root path ('/')
app.use('/', indexRoutes);

// Mount the auth routes under the '/auth' path
app.use('/auth', authRoutes);

// Hello World route (protected - updated to use res.render)
app.get('/hello', isAuthenticated, (req, res) => {
    res.render('hello', { user: req.user }); // Render the 'hello.ejs' template
});

// Start the server
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

module.exports = app;
