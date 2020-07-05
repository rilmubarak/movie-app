'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  class MovieCast extends Model {};
  MovieCast.init({
    role: {
      type: Sequelize.STRING,
      validate : {
        notEmpty : {
          msg : 'Role is required'
        }
      }
    },
    MovieId: DataTypes.INTEGER,
    CastId: {
      type: Sequelize.INTEGER,
      allowNull : true,
      validate : {
        customNull(value){
          if(value === null){
            throw new Error('Actor is required')
          }
        }
      }
    }
  }, {sequelize});
  MovieCast.associate = function(models) {
    // associations can be defined here
  };
  return MovieCast;
};