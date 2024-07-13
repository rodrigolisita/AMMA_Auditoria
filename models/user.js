// models/user.js
class User {
    constructor(id, email, password, role = 'user') {
      this.id = id;
      this.email = email;
      this.password = password;
      this.role = role;
    }
  }
  module.exports = User;