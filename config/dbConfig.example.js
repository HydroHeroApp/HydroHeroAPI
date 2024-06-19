const Sequelize = require('sequelize');

const sequelize = new Sequelize('NAMA_DATABASE', 'USERNAME_DATABASE', 'PASSWORD_DATABASE', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;