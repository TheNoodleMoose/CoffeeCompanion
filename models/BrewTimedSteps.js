module.exports = function(sequelize, DataTypes) {
  var BrewTimedStep = sequelize.define("BrewTimedStep", {
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
    time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  BrewTimedStep.associate = function(models) {
    BrewTimedStep.belongsTo(models.BrewMethod, { foreignKey: "id" });
  };

  return BrewTimedStep;
};
