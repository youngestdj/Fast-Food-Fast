const appRouter = (app) => {
  app.get('/', (req, res) => {
    res.json({ status: 'success', message: 'Hello World' });
  });
};

module.exports = appRouter;
