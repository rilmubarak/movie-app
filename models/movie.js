'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Movie extends Model{}

  Movie.init({
    name: DataTypes.STRING,
    released_year: {
      type : Sequelize.INTEGER,
      validate : {
        isKabisatYear(value){
          if(isNaN(value)){
            throw new Error('Invalid released year')
          } else {
            const num = Number(value)
            if(num % 4 === 0 && num % 100 !== 0){
              throw new Error('Kabisat year - unable to release movie')
            } else if( num % 4 === 0 && num % 100 === 0 && num % 400 === 0){
              throw new Error('Kabisat year - unable to release movie')
            }
          }
        }
      }
    },
    genre: DataTypes.STRING,
    ProductionHouseId: DataTypes.INTEGER,
    rating: {
      type: Sequelize.INTEGER,
      allowNull : true,
      validate : {
        ratingCheck(value){
          if(value){
            if(isNaN(value)){
              throw new Error('Invalid rating input')
            } else {
              if(Number(value) > 5 || Number(value) <1){
                throw new Error('Rating is between 1 and 5')
              }
            }
          }
        }
      }
    }
  }, {sequelize});
  Movie.associate = function(models) {
    Movie.belongsTo(models.ProductionHouse)
    Movie.belongsToMany(models.Cast, {through: models.MovieCast})
  };
  return Movie;
};