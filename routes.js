module.exports = function (app) {
  /*
  * Routes
  */
  app.use('/esp', require('./routes/esp.route'));

};
