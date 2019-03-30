module.exports = function(sequelize, DataTypes) {
  const BrewStep = sequelize.define('BrewStep', {
    // The email cannot be null, and must be a proper email before creation
    BrewingMethod: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    StepTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SvgPath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SubText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isTimedStep: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    time: {
      type: DataTypes.INTEGER,
    },
  });

  BrewStep.associate = function(models) {
    BrewStep.belongsTo(models.BrewMethod);
  };

  return BrewStep;
};
