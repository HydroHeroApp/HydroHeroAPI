module.exports = (sequelize, DataTypes) => {
    const WaterIntake = sequelize.define('WaterIntake', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      profileId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'water_intakes',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  
    WaterIntake.associate = (models) => {
      WaterIntake.belongsTo(models.profile, {
        foreignKey: 'profileId',
        as: 'profile'
      });
    };
  
    return WaterIntake;
  };
