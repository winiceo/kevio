import session from 'express-session';
const store   = require('connect-redis')(session);

export default function(app) {

    const _log   = app.lib.logger;
    const _group = 'BOOT:SESSION';

    try {
        // get config
        let _conf = app.lib.bootConf(app, 'session');
        _conf = _conf || {};
        _conf.store = new store({client: app.core.redis.a});

        // session
        app.use(session(_conf))
        return true;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};




