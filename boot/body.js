import body from 'body-parser';

export default function(app) {

    const _log   = app.lib.logger;
    const _group = 'BOOT:BODY';

    try {
        const _conf = app.lib.bootConf(app, 'body');

        app.use(body.urlencoded(_conf.urlencoded || {}));
        app.use(body.json(_conf.json || {}));

        return true;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};




