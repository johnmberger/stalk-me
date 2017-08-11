(function(appConfig) {

  'use strict';

  // *** main dependencies *** //
  const path = require('path');
  const cookieParser = require('cookie-parser');
  const bodyParser = require('body-parser');
  const flash = require('connect-flash');
  const morgan = require('morgan');

  appConfig.init = function(app, express) {

    // *** app middleware *** //
    if (process.env.NODE_ENV !== 'test') {
      app.use(morgan('dev'));
    }

    const allowCrossDomain = (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    };

    app.use(allowCrossDomain);
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(flash());
    app.use(express.static(path.join(__dirname, '..', '..', 'client')));

  };

})(module.exports);
