var winston = require('winston');
var _       = require('underscore');


import { logger,
    configureLogger }         from '../common/log/logger';
module.exports = function(app) {

    var _env  = app.get('env');
    var _conf = app.config[_env].logger; // logger config


    // winston.emitErrs = true; // don't supress errors
    // var logger = new winston.Logger({exitOnError: false});
    //
    //
    //
    // // add transport
    // winston.add(winston.transports.File, { filename: '/deploy/genv/logs/somefile.log' });
    // //logger.add(winston.transports[_conf.transport], _conf.options);
    //

   //  var log4js = require('log4js');
   //  log4js.configure({
   //      appenders: [
   //          { type: 'console' },
   //          { type: 'file', filename: 'logs/cheese.log', category: 'cheese' }
   //      ]
   //  });
   //
   //  var logger = log4js.getLogger('cheese');
   // // logger.setLevel( 'DEBUG' : 'ERROR')


    return logger;

};

