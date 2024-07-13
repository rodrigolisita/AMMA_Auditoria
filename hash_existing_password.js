// hash_existing_password.js
const bcrypt = require('bcrypt');
const pool = require('./db'); // Or however you are connecting to your database

async function hashExistingPassword() {
  try {
    // Fetch the first user's password
    const [rows] = await pool.query('SELECT password FROM users WHERE id = 0'); // Assuming the first user has ID 1
    const plainTextPassword = rows[0].password;

    // Hash the password
    const hashedPassword = await bcrypt.hash(plainTextPassword, 10); 

    // Update the password in the database
    await pool.query('UPDATE users SET password = ? WHERE id = 0', [hashedPassword]);

    console.log('Password updated successfully!');
  } catch (err) {
    console.error('Error updating password:', err);
  }
}

hashExistingPassword();