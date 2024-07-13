// routes/admin.js

const express = require('express');
const router = express.Router();
const {isAdmin} = require('../middleware'); // Assuming your isAdmin middleware is in a separate file
const { isAuthenticated } = require('../middleware');
const Usuario = require('../models/user');


/* router.get('/edit-users', isAdmin, async(req,res) =>{ */
/*     res.send("Hello"); */
/* }) */


router.get('/edit-users', isAdmin, async (req, res) => {
    try {
        const allUsers = await Usuario.findAll(); // Fetch all users from the database
        res.render('edit-users', { users: allUsers });
        //res.render('edit-users');
        
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Ocorreu um erro ao buscar os usuários.');
        res.redirect('hello'); // Or redirect to another error page
    }
});

module.exports = router;