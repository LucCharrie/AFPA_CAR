'use strict';

let UsersService = require('./users.service');
let passwordHash = require('password-hash');

class UsersAuthService
{
  static checkAccount(email, password, cb) {
    UsersService.findByEmail(email, (err, user) => {
      let encodedPassword = passwordHash.generate(password);

      if (user && passwordHash.verify(password, encodedPassword)) {
        cb(null, user);
      }
      else {
        cb(new Error('Authentication failed !'));
      }
    });
  }
}

module.exports = UsersAuthService;