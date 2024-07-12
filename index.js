// index.js
const express = require('express');
const app = express();
const pool = require('./db');

app.get('/', async (req, res) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM users');

        // Create a string representation of the user data
        let userData = '';
        rows.forEach(row => {
            userData += `ID: ${row.id}, Username: ${row.username}, Email: ${row.email}\n`;
        });

        res.send(userData); // Send the user data as plain text

    } catch (err) {
        console.error('Error fetching users:', err);
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
