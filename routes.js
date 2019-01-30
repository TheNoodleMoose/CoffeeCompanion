const AuthenticationController = require('./controllers/AuthenticationController');
const BrewMethodsController = require('./controllers/BrewMethodsController')
const exjwt = require('express-jwt');

const jwtMW = exjwt({
  secret: 'supersecret'
});

module.exports = (app) => {
  app.post('/register',
    AuthenticationController.register
  );

  app.post('/login',
    AuthenticationController.login
  );

  app.get('/api/test', (req, res) => {
    res.send({ message: 'Hello World!' })
  });

  app.post('/addbrew',
    BrewMethodsController.addBrewMethod
  );

  app.post('/addstep',
    BrewMethodsController.addBrewStep
  );

  app.get('/getsteps',
    BrewMethodsController.searchBrewSteps
  )
};
