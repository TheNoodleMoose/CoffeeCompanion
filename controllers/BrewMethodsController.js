const db = require('../models');

module.exports = {
  async addBrewMethod(req, res) {
    const { name, defaultGrindSize } = req.body;
    const brewMethod = await db.BrewMethod.create({
      name,
      defaultGrindSize
    });

    res.json(brewMethod);
  },

  async addBrewStep(req, res) {
    const { BrewingMethod, StepTitle, SvgPath, SubText } = req.body;
    const brewStep = await db.BrewStep.create({
      BrewingMethod,
      StepTitle,
      SvgPath,
      SubText
    });

    res.json(brewStep);
  },

  async addTimeBrewStep(req, res) {
    const { BrewingMethod, StepTitle, SvgPath, SubText } = req.body;
    const brewStep = await db.BrewStep.create({
      BrewingMethod,
      StepTitle,
      SvgPath,
      SubText,
      time
    });

    res.json(brewStep);
  },

  async searchBrewSteps(req, res) {
    const { BrewMethod } = req.body;
    const brewSteps = await db.BrewMethod.findOne({
      where: {
        name: BrewMethod
      },
      include: [{
        model: db.BrewStep
      }]
    });

    res.json(brewSteps);
  },

  async searchTimeBrewSteps(req, res) {
    const { BrewMethod } = req.body;
    const brewSteps = await db.BrewMethod.findOne({
      where: {
        name: BrewMethod
      },
      include: [{
        model: db.BrewTimedStep
      }]
    });

    res.json(brewSteps);
  }
}