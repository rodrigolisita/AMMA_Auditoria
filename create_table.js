const mysql = require('mysql2/promise'); // Import with promises for easier async handling

async function createTable() {
    const connection = await mysql.createConnection({
        host: 'localhost',  // Replace with your host (e.g., 'localhost')
        user: 'root',     // Replace with your MySQL username
        password: 'A1inuH2d$$', // Replace with your MySQL password
        database: 'auditores'          // Replace with your database name
    });

    const sql = `
        CREATE TABLE users (
            id INT PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE,
            password VARCHAR(255) NOT NULL
        )
    `;

    try {
        await connection.query(sql);
        console.log('Table "users" created successfully');
    } catch (err) {
        console.error('Error creating table:', err);
    } finally {
        connection.end();
    }
}

createTable();