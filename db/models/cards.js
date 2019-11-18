'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cards = sequelize.define('Cards', {
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    content: DataTypes.STRING,
    category: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Cards.associate = function(models) {
    // associations can be defined here
    Cards.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' })
  };
  return Cards;
};
