// routes/index.js
const express = require('express');
const router = express.Router();
const path = require('path');

// Index Route (Unprotected)
router.get('/', (req, res) => {
    res.render('index',{
        title: req.app.locals.siteTitle
    });
});

module.exports = router; 
