'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, done) {
  db.createTable('role_map', {
  id: {
    type: 'int',
    primaryKey: true,
    autoIncrement: true
},

  user_id: {
    type: 'int'
},

role_id: {
    type: 'int'
},

}, done);
return null;
};

exports.down = function(db) {
  db.dropTable('role_map')
  return null;
};

exports._meta = {
  "version": 1
};
