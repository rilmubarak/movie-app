'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Cast extends Model{
    get name(){
      return `${this.first_name} ${this.last_name}` 
    }
  }

  Cast.init ({
    first_name: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg : 'First name is required'
        }
      }
    },
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birth_year: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {sequelize});
  Cast.beforeCreate( (instance, option) => {
    if(!instance.last_name) instance.last_name = instance.first_name 
  })
  Cast.associate = function(models) {
    Cast.belongsToMany(models.Movie, {through: models.MovieCast})
  };
  return Cast;
};