import short from 'short';

export default function(app) {

    const _env   = app.get('env');
    const _log   = app.lib.logger;
    const _group = 'BOOT:SHORTENER';

    try {
        short.run(app.core.mongo.mongoose);
        return short;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};




