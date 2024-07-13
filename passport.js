// passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./db'); // Assuming your database connection file is named db.js
const bcrypt = require('bcrypt');
const User = require('./models/user');

passport.use(
    new LocalStrategy({ usernameField: 'userId' }, async (userId, password, done) => { 
      try {
        const [rows] = await pool.query('SELECT id, email, password, role FROM users WHERE id = ?', [userId]);  // Fetch 'role' as well
        if (rows.length === 0) { return done(null, false, { message: 'Incorrect userId.' }); } 
        const user = new User(rows[0].id, rows[0].email, rows[0].password, rows[0].role);  // Include the role from the query result
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) { return done(null, false, { message: 'Incorrect password.' }); } 
        return done(null, user); 
      } catch (err) {
        return done(err);
      }
    })
  );

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0) { return done(null, false); }
    const user = new User(rows[0].id, rows[0].email, rows[0].password, rows[0].role); 
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;