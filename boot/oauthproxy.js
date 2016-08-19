import oauthshim from 'oauth-shim';

export default function(app) {

    const _env   = app.get('env');
    const _log   = app.lib.logger;
    const _group = 'BOOT:OAUTHPROXY';

    try {
        const _conf = app.lib.bootConf(app, 'oauthproxy');
        app.all('/api/oauthproxy', oauthshim);
        oauthshim.init(_conf);
        return true;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};






