module.exports = function (app) {

  /*
  * Routes
  */
  app.use('/esp', require('./routes/esp.route'));
  app.use('/test', require('./routes/test.route'));

};
