import cookie from 'cookie-parser';

export default function(app) {

    const _log   = app.lib.logger;
    const _group = 'BOOT:COOKIE';

    try {
        app.use(cookie());
        return true;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};




