module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
      userIdx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      kakaoId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tel: {
        type: DataTypes.STRING,
        allowNull: false
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
    } ,{
      timestamps: false
    });
};