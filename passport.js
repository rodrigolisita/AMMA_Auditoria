// passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./db'); // Assuming your database connection file is named db.js
const bcrypt = require('bcrypt');
const User = require('./models/user');

passport.use(
    new LocalStrategy({ usernameField: 'userId' }, async (userId, password, done) => {
      try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (rows.length === 0) { return done(null, false, { message: 'Incorrect userId.' }); }
        const user = new User(rows[0].id, rows[0].email, rows[0].password, rows[0].role, rows[0].username); // Include username
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
      const user = new User(rows[0].id, rows[0].email, rows[0].password, rows[0].role, rows[0].username); // Include username
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  
module.exports = passport;