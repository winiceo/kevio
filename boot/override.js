import override from 'method-override';

export default function(app) {

    const _log   = app.lib.logger;
    const _group = 'BOOT:OVERRIDE';

    try {
        app.use(override('X-HTTP-Method-Override'));
        return true;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};




