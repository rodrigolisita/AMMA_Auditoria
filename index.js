// index.js
const express = require('express');
const app = express();
const pool = require('./db');
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM users');
        // Create HTML table to display user data
        let tableHtml = `
            <h2>User Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
        `;

        rows.forEach(row => {
            tableHtml += `
                <tr>
                    <td>${row.id}</td>
                    <td>${row.username}</td>
                    <td>${row.email}</td>
                </tr>
            `;
        });

        tableHtml += `
                </tbody>
            </table>
        `;

        res.send(tableHtml); 
        
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const [rows, fields] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length > 0) {
            const user = rows[0];
            // In a real application, you'd compare the hashed password here
            if (password === user.password) { 
                res.send('Login successful!');
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
