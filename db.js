// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',  
    user: 'root',
    password: 'A1inuH2d$$',
    database: 'auditores'
});

module.exports = pool;