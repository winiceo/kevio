import compress from 'compression';

export default function(app) {

    const _log   = app.lib.logger;
    const _group = 'BOOT:COMPRESS';

    try {
        app.use(compress());
        return true;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};




