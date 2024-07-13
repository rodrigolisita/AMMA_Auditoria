// routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('../passport');
const User = require('../models/user'); // Make sure this path is correct
const bcrypt = require("bcrypt");
const { isAuthenticated } = require('../middleware');


// Login Route
router.post('/login', passport.authenticate('local', {
  successRedirect: '/user/hello', // Redirect to /hello on successful login
  failureRedirect: '/',  // Redirect to the index route on failure
  failureFlash: true, // Enable flash messages for error handling
}), (req, res) => {
    // This function will only be called if authentication is successful
    // You can access the flash messages here if needed
    const messages = req.flash('error');
    res.send('Logged in successfully.' + (messages.length > 0 ? ` (Messages: ${messages.join(', ')})` : ''));
  });

// Logout Route
router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Register Route
router.post('/register', async (req, res) => {
  const { userId, password, role = 'user' } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (rows.length > 0) {
      return res.status(400).json({ error: 'User ID already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    await pool.query('INSERT INTO users (id, password, role) VALUES (?, ?, ?)', [userId, hashedPassword, role]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while registering' });
  }
});

module.exports = router;
