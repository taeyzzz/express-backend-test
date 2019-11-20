'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
    Users.hasMany(models.Cards, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      as: "cards"
    })
  };
  return Users;
};
