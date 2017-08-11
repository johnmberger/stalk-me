(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const stats = require('../routes/stats');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/stats/', stats);

  };

})(module.exports);
