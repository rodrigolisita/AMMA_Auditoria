// models/user.js

const Sequelize = require('sequelize');
const sequelize = require('../db'); // Make sure the path is correct

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true 
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.STRING,
    defaultValue: 'user' 
  }
}, {
  timestamps: false // Disable timestamps
});

module.exports = User;
