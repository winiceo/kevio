import socketioJwt from 'socketio-jwt';

export default function(app) {

    const _log   = app.lib.logger;
    const _env   = app.get('env');
    const _conf  = app.config[_env].api; // api config
    const _group = 'BOOT:SOCKETAUTH';

    try {
        app.io.use(socketioJwt.authorize({
            secret: _conf.token.secret,
            handshake: true
        }));

        return true;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};




