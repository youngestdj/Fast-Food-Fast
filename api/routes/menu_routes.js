const controller = require('../controllers/menu_controllers.js');
const verifyToken = require('../auth/verify_token.js');


const menuRouter = (app) => {
  // API endpoint for admin to add new menu option
  app.post('/api/v1/menu/', verifyToken.verifyToken, controller.addMenu);

  // API endpoint for user to get menu options
  app.get('/api/v1/menu/', verifyToken.verifyToken, controller.getMenu);
};

module.exports = menuRouter;
