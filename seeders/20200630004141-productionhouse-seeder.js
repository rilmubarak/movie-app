'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('ProductionHouses', [
    {
      name_prodHouse: `Walt Disney Studios`,
      headquaters: `Burbank, California, United States`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name_prodHouse: `Pixar`,
      headquaters: `Emeryville, California, United States`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name_prodHouse: `Warner Bros`,
      headquaters: `Los Angeles, California, United States`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name_prodHouse: `Universal Pictures`,
      headquaters: `Universal City, California, United States`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name_prodHouse: `Paramount Pictures`,
      headquaters: `Los Angeles, California, United States`,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('ProductionHouses', null, {});
  }
};
