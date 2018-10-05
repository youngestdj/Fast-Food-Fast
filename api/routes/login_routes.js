const controller = require('../controllers/login_controllers.js');

const loginRouter = (app) => {
  app.post('/api/v1/auth/login/', controller.logUserIn);
};

module.exports = loginRouter;
