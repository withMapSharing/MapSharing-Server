const db = require(".");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('place', {
      placeIdx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      mapIdx: {
        type: DataTypes.INTEGER,
        reference: {
          model: db.Map,
          key: 'mapIdx'
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      longtitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      reserve: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      reserveDay: {
        type: DataTypes.DATE,
        allowNull: true
      }
    } ,{
      timestamps: false
    });
};