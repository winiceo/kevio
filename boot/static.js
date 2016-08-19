import express from 'express';
import path from 'path';

export default function(app) {

    const _log   = app.lib.logger;
    const _group = 'BOOT:STATIC';

    try {
        // get config
        const _env  = app.get('env');
        const _conf = app.lib.bootConf(app, 'static');
        const _dir  = path.dirname(__dirname);

        app.use(express.static(_dir+'/'+(_conf.dir || 'public'), (_conf.options || {}) ));
        app.use(express.static(app.get('basedir')+'/'+(_conf.dir || 'public'), (_conf.options || {}) ));
        return true;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};




