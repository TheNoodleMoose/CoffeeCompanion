const db = require('../models');
const jwt = require('jsonwebtoken');


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
      if (dbUser.validPassword(password)) {
        const token = jwt.sign({ email: email }, 'supersecret', { expiresIn: '24h' });
        res.json({
          success: true,
          err: null,
          token
        });
      }

    }
  }
};
