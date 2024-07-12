// index.js
const express = require('express');
const app = express();
const path = require('path');
const pool = require('./db');
const bodyParser = require('body-parser');


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the login form (index.html) at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', async (req, res) => {
    const { userId, password } = req.body;

    try {
        // Query the database to find the user
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);

        if (rows.length > 0) {
            const user = rows[0];
            
            // Compare the entered password with the stored password
            if (password === user.password) {
                res.send('Hello World!'); // Replace with your desired redirection
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


// Start the server
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

module.exports = app; 