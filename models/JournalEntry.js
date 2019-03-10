module.exports = function (sequelize, DataTypes) {
  var JournalEntry = sequelize.define("JournalEntry", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BrewMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    GrindSize: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Coffee: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Roaster: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BrewTime: {
      type: DataTypes.INTEGER,
    },
    Ratio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  JournalEntry.associate = function (models) {
    JournalEntry.belongsTo(models.User);
  };

  return JournalEntry;
};
