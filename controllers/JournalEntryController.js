const db = require('../models');

module.exports = {
  async addJournalEntry(req, res) {
    const { userParameters, timer, user } = req.body;
    console.log(req.body);
    const journalEntry = await db.JournalEntry.create({
      userEmail: user.email,
      BrewMethod: userParameters.brewMethod,
      GrindSize: userParameters.grindSize,
      Coffee: userParameters.country,
      Roaster: userParameters.roaster,
      BrewTime: timer,
      CoffeeIn: userParameters.coffeeInput,
      CoffeeOut: Math.floor(parseInt(userParameters.coffeeOutput) * 29.57),
      CoffeeOunces: userParameters.coffeeOutput,
    });

    res.json(journalEntry);
  },

  async getEntries(req, res) {
    const { email: userEmail } = req.params;
    const entries = await db.JournalEntry.findAll({
      where: {
        userEmail,
      },
      order: [['createdAt', 'DESC']],
    });
    res.json(entries);
  },

  async addBrewStep(req, res) {
    const {
      BrewingMethod,
      StepTitle,
      SvgPath,
      SubText,
      isTimedStep,
      time,
    } = req.body;
    const brewStep = await db.BrewStep.create({
      BrewingMethod,
      StepTitle,
      SvgPath,
      SubText,
      isTimedStep,
      time,
    });

    res.json(brewStep);
  },

  async searchBrewSteps(req, res) {
    const { BrewMethod } = req.body;
    const brewSteps = await db.BrewMethod.findOne({
      where: {
        name: BrewMethod,
      },
      include: [
        {
          model: db.BrewStep,
          where: { isTimedStep: false },
        },
      ],
    });

    res.json(brewSteps);
  },

  async searchTimeBrewSteps(req, res) {
    const { BrewMethod } = req.body;
    const brewSteps = await db.BrewMethod.findOne({
      where: {
        name: BrewMethod,
      },
      include: [
        {
          model: db.BrewStep,
          where: { isTimedStep: true },
        },
      ],
    });

    res.json(brewSteps);
  },
};
