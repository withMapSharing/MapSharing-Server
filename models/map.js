module.exports = (sequelize, DataTypes) => {
    return sequelize.define('map', {
      mapIdx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: false
      },
      color: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      open: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    } ,{
      timestamps: false
    });
};