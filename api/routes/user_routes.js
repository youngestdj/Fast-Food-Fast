const controller = require('../controllers/user_controllers.js');
const verifyToken = require('../auth/verify_token.js');


const userRouter = (app) => {
  // API endpoint to get user details
  app.get('/api/v1/user/:id', verifyToken.verifyToken, controller.getUser);

  // API endpoint to get user details from the token provided
  app.get('/api/v1/user', verifyToken.verifyToken, controller.getUserFromToken);
};

module.exports = userRouter;
