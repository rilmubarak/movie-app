'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductionHouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductionHouse.hasMany(models.Movie)
    }
  };
  ProductionHouse.init({
    name_prodHouse: DataTypes.STRING,
    headquaters: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductionHouse',
  });
  return ProductionHouse;
};