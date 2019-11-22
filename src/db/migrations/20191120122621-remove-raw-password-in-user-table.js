'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Users', // name of Source model
      'password' // key we want to remove
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users', // name of Source model
      'password', // name of the key we're adding
      {
        type: Sequelize.STRING,
      }
    );
  }
};
