'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Movies', 'rating', Sequelize.INTEGER)
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('Movies', 'rating')
  }
};