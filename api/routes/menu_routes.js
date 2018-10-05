const controller = require('../controllers/menu_controllers.js');


const menuRouter = (app) => {
  // API endpoint for admin to add new menu option
  app.post('/api/v1/menu/', controller.addMenu);

  // API endpoint for user to get menu options
  app.get('/api/v1/menu/', controller.getMenu);
};

module.exports = menuRouter;
