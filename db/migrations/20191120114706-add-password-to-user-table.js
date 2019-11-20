'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users', // name of Source model
      'passwordHash', // name of the key we're adding
      {
        type: Sequelize.STRING,
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Users', // name of Source model
      'passwordHash' // key we want to remove
    );
  }
};
