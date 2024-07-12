// routes/auth.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); 
const path = require('path');

// Login route 
router.post('/login', async (req, res) => {
    const { userId, password } = req.body;

    try {
        // Query the database to find the user
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);

        if (rows.length > 0) {
            const user = rows[0];

            // Compare the entered password with the stored password
            if (password === user.password) {
                req.session.userId = user.id; 
                res.sendFile(path.join(__dirname, '../public', 'hello.html')); 
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

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/'); // Redirect to login after logout
    });
});

module.exports = router; // Export the router
