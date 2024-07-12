// index.js
const express = require('express');
const app = express();
const middleware = require('./middleware');
const authRoutes = require('./routes/auth'); 
const indexRoutes = require('./routes/index'); // Import the index routes

// Apply middleware
middleware(app); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Mount the index routes at the root path ('/')
app.use('/', indexRoutes);

// Mount the auth routes under the '/auth' path
app.use('/auth', authRoutes);

// Hello World route (protected)
app.get('/hello', (req, res) => {
    if (req.session.userId) {
        res.sendFile(path.join(__dirname, 'public', 'hello.html'));
    } else {
        res.redirect('/'); // Redirect to login if not logged in
    }
});

// Start the server
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

module.exports = app; 