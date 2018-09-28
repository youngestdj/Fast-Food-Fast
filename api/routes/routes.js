const appRouter = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello World');
  });
};

module.exports = appRouter;
