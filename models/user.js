// models/user.js
class User {
    constructor(id, email, password, role = 'user', username) { // Add username parameter
      this.id = id;
      this.email = email;
      this.password = password;
      this.role = role;
      this.username = username; // Add username property
    }
  }
  
  module.exports = User;