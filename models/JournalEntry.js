module.exports = function(sequelize, DataTypes) {
  const JournalEntry = sequelize.define('JournalEntry', {
    // The email cannot be null, and must be a proper email before creation
    userEmail: {
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
    CoffeeIn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CoffeeOut: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CoffeeOunces: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  JournalEntry.associate = function(models) {
    JournalEntry.belongsTo(models.User, { foreignKey: 'email' });
  };

  return JournalEntry;
};
