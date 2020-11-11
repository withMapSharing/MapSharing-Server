const db = require(".");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment', {
      commentIdx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      placeIdx: {
        type: DataTypes.INTEGER,
        reference: {
          model: db.Place,
          key: 'placeIdx'
        }
      },
      kakaoId: {
        type: DataTypes.STRING,
        reference: {
          model: db.User,
          key: 'kakaoId'
        }
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true
      },
      regDay: {
        type: DataTypes.DATE,
        allowNull: true
      }
    } ,{
      timestamps: false
    });
};