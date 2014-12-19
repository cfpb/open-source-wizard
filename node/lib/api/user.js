// Generated by IcedCoffeeScript 1.8.0-c
(function() {
  var couch_utils, isInt, user, user_db;

  couch_utils = require('../couch_utils');

  user = {};

  user_db = couch_utils.nano_admin.use('_users');

  isInt = function(s) {
    return String(parseInt(s)) === s;
  };

  user.get_user = function(req, resp) {
    return couch_utils.rewrite(user_db, 'base', '/users/org.couchdb.user:' + req.session.user).pipe(resp);
  };

  module.exports = user;

}).call(this);