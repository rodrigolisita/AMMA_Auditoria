/* // db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',  
    user: 'root',
    password: 'A1inuH2d$$',
    database: 'auditores'
});

module.exports = pool; */
const Sequelize = require('sequelize');
const mysql = require('mysql2/promise'); // Import mysql2/promise

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'A1inuH2d$$',
    database: 'auditores'
});

const sequelize = new Sequelize('auditores', 'root', 'A1inuH2d$$', {
    dialect: 'mysql', // Specify the dialect as 'mysql'
    pool: {
        max: 5, // Maximum number of connections in the pool
        min: 0, // Minimum number of connections in the pool
        idle: 10000, // Maximum time (in milliseconds) a connection can be idle before being released
        acquire: 30000, // Maximum time (in milliseconds) to wait for a connection to be acquired
        evict: 10000, // How often (in milliseconds) to check for and remove idle connections
    }
});


module.exports = sequelize;