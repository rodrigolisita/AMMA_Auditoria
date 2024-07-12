// index.js
const express = require('express');
const app = express();
const path = require('path');
const pool = require('./db');
const bodyParser = require('body-parser');
const middleware = require('./middleware');

// Apply middleware
middleware(app);  // Call the middleware function and pass the app instance


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the login form (index.html) at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Login route 
app.post('/login', async (req, res) => {
    const { userId, password } = req.body;

    try {
        // Query the database to find the user
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);

        if (rows.length > 0) {
            const user = rows[0];

            // Compare the entered password with the stored password
            if (password === user.password) {
                req.session.userId = user.id; // Store user ID in session
                res.redirect('/hello'); // Redirect to /hello on successful login
            } else {
                res.send('Invalid credentials');
            }
        } else {
            res.send('User not found');
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Hello World route (protected)
app.get('/hello', (req, res) => {
    if (req.session.userId) {
        res.sendFile(path.join(__dirname, 'public', 'hello.html'));
    } else {
        res.redirect('/'); // Redirect to login if not logged in
    }
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => { // Destroy the session
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/'); // Redirect to login after logout
    });
});


// Start the server
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

module.exports = app; 
