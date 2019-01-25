const AuthenticationController = require('./controllers/AuthenticationController');

module.exports = (app) => {
  app.post('/register',
    AuthenticationController.register);

  app.get('/api/test', (req, res) => {
    res.send({ message: 'Hello World!' })
  })
};
