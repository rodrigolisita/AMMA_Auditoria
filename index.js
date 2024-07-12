// index.js
const express = require('express');
const app = express();
const path = require('path');
const middleware = require('./middleware');
const authRoutes = require('./routes/auth'); 

// Middleware
middleware(app); 
app.use(express.urlencoded({ extended: true })); // Use built-in middleware to parse form data
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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
