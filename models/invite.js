const db = require(".");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('invite', {
      inviteIdx: {
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
      kakaoId: {
        type: DataTypes.STRING,
        reference: {
          model: db.User,
          key: 'kakaoId'
        }
      },
    } ,{
      timestamps: false
    });
};