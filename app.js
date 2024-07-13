// index.js
const express = require('express');
const app = express();
const passport = require('./passport'); // Import Passport
const middleware = require('./middleware');
const authRoutes = require('./routes/auth'); 
const indexRoutes = require('./routes/index'); // Import the index routes
const path = require('path');


// Apply middleware
middleware(app); 

// Express body parsing (add if you're not already using it)
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Mount the index routes at the root path ('/')
app.use('/', indexRoutes);

// Mount the auth routes under the '/auth' path
app.use('/auth', authRoutes);

// Hello World route (protected - update with Passport middleware)
app.get('/hello', app.isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'hello.html'));
});

// Protected Admin Dashboard Route
app.get('/admin-dashboard', app.isAdmin, (req, res) => {
    // ... admin dashboard content (e.g., render a view, send JSON data, etc.)
  });

// Start the server
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

module.exports = app; 
