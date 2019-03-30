const jwt = require('jsonwebtoken');
const db = require('../models');

module.exports = {
  async register(req, res) {
    console.log(req.body);
    const { email, password, name } = req.body;
    const dbUser = await db.User.create({
      email,
      name,
      password,
    });
    console.log('User created: ', dbUser);
    res.json({
      success: true,
      err: null,
    });
  },

  async login(req, res) {
    const { email, password } = req.body;
    const dbUser = await db.User.findOne({
      where: { email },
    });

    if (dbUser === null) {
      res.status(401).json({
        success: false,
        err: 'Incorrect username/password',
        token: null,
      });
    } else if (dbUser.validPassword(password)) {
      const { name } = dbUser;
      const token = jwt.sign({ name, email }, 'supersecret', {
        expiresIn: '24h',
      });
      res.json({
        success: true,
        err: null,
        token,
      });
    } else {
      res.status(401).json({
        success: false,
        err: 'Incorrect username/password',
        token: null,
      });
    }
  },
};
