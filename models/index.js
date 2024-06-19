const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import model
db.users = require('./userModel')(sequelize, DataTypes);
db.profile = require('./profileModel')(sequelize, DataTypes);
db.WaterIntake = require('./waterintakeModel')(sequelize, DataTypes);

// Setup associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
