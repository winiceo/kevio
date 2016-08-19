import flash from 'connect-flash';

export default function(app) {

    const _log   = app.lib.logger;
    const _group = 'BOOT:FLASH';

    try {
        app.use(flash());
        return true;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};




