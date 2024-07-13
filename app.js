// app.js
const express = require('express');
const app = express();
const passport = require('./passport');
const middleware = require('./middleware');
const authRoutes = require('./routes/auth'); 
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const path = require('path');

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

app.use('/user', userRoutes); // Mount userRoutes at the '/user' path (or any path you prefer)

// Start the server
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

module.exports = app;
