// routes/user.js
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const { isAuthenticated } = require("../middleware");
const pool = require('../db'); 

// Hello World Route (Protected)
router.get('/hello', isAuthenticated, (req, res) => {
    console.log(req.user);
    res.render('hello', { user: req.user });
});

// Get Route for editing user information
router.get('/edit-profile', isAuthenticated, (req, res) => {
    res.render('edit-profile', {user: req.user});
});
  
router.post('/edit-profile', isAuthenticated, async (req, res) => {
  const { userId, username, password, email } = req.body;

  try {
    let updateFields = { username, email };

    if (password) { 
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    await pool.query('UPDATE users SET ? WHERE id = ?', [updateFields, userId]);
    req.flash('success_msg', 'Profile updated successfully');
    res.redirect('/user/hello'); 
  } catch (err) {
    console.error('Error updating profile:', err);
    req.flash('error_msg', 'An error occurred while updating profile');
    res.redirect('/user/edit-profile'); 
  }
});

module.exports = router; 
