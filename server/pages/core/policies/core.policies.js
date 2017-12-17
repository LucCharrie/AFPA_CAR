'use strict';

let acl = require('acl');
acl = new acl(new acl.memoryBackend());

acl.allow([{
    roles: ['user'],
    allows: [{
        resources: '/home',
        permissions: ['get']
    }]
}]);

exports.isAllowed = function (req, res, next) {
  var roles = (req.session.user) ? req.session.user.roles.split(',') : ['guest'];

  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        return next();
      } else {
        return res.status(403).json({
          message: 'You need subscribe'
        });
      }
    }
  });
};