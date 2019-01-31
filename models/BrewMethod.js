module.exports = function (sequelize, DataTypes) {
  var BrewMethod = sequelize.define("BrewMethod", {
    // The email cannot be null, and must be a proper email before creation
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    // The password cannot be null
    defaultGrindSize: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  BrewMethod.associate = function (models) {
    BrewMethod.hasMany(models.BrewStep, { foreignKey: 'BrewingMethod' });
    BrewMethod.hasMany(models.BrewTimedStep, { foreignKey: 'BrewingMethod' });
  };

  return BrewMethod;
};
