const controller = require('../controllers/signup_controllers.js');

const signupRouter = (app) => {
  app.post('/api/v1/auth/signup/', controller.signUserUp);
};

module.exports = signupRouter;
