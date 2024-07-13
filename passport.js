// passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user'); // Make sure this is your Sequelize User model
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy({ usernameField: 'userId' }, async (userId, password, done) => {
    try {
      const usuario = await User.findByPk(userId);
      if (!usuario) {
        return done(null, false, { message: 'Usuário não encontrado' });
      }

      const isValid = await bcrypt.compare(password, usuario.password);
      if (!isValid) {
        return done(null, false, { message: 'Senha incorreta' });
      }

      return done(null, usuario);
    } catch (err) {
      console.error('Error in Passport strategy:', err); 
      return done(err); 
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id); // Use Sequelize here as well
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

module.exports = passport;
