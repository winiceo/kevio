export default function(app) {

    const _log   = app.lib.logger;
    const _group = 'BOOT:X_POWERED_BY';

    try {
        app.disable('x-powered-by');
        return true;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};



