const dbconf = require('./dbconf.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbconf.DB, dbconf.USER, dbconf.PASSWORD, {
    host: dbconf.HOST,
    dialect: dbconf.DIALECT,
    operatorsAliases: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Users = require('../models/users.js')(sequelize, Sequelize);

module.exports = db;