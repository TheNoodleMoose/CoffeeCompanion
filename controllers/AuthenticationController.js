const db = require('../models');

module.exports = {
  async register(req, res) {
    const { email, password } = req.body;
    const dbUser = await db.User.create({
      email: email,
      password: password
    });
    console.log("User created: ", dbUser);
    res.json("user created!");
  },

  async login(req, res) {
    const { email, password } = req.body;
    const dbUser = await db.User.findOne({
      where: { email: email }
    });

    if (dbUser === null) {
      res.json(false);
    } else {

      const result = dbUser.validPassword(password);
      console.log(result);
      res.json(dbUser);
    }
  }
};
