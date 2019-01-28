const db = require('../models');
const jwt = require('jsonwebtoken');


module.exports = {
  async register(req, res) {
    console.log(req.body);
    const { email, password, name } = req.body;
    const dbUser = await db.User.create({
      email: email,
      name: name,
      password: password
    });
    console.log("User created: ", dbUser);
    res.json({
      success: true,
      err: null
    });
  },

  async login(req, res) {
    const { email, password } = req.body;
    const dbUser = await db.User.findOne({
      where: { email: email }
    });

    if (dbUser === null) {
      res.status(401).json({
        success: false,
        err: 'Incorrect username/password',
        token: null
      });
    } else {
      if (dbUser.validPassword(password)) {
        const { name } = dbUser;
        const token = jwt.sign({ name: name }, 'supersecret', { expiresIn: '24h' });
        res.json({
          success: true,
          err: null,
          token
        });
      } else {
        res.status(401).json({
          success: false,
          err: 'Incorrect username/password',
          token: null
        })
      }

    }
  }
};
