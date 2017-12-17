'use strict';

let UsersService = require('./users.service');
let passwordHash = require('password-hash');


class UsersRegisterService
{
  static register(newUser, cb) {
    UsersService.findByEmail(newUser.email, (err, user) => {
      if (user) {
        return cb(new Error('Account already exist !'));
      }

      newUser.password = passwordHash.generate(newUser.password);

      UsersService.create(newUser, (err, user) => {
        if (user) {
          cb(null, user);
        }
        else {
          cb(new Error('Subscription failed !'));
        }
      });
    });
  }
}

module.exports = UsersRegisterService;