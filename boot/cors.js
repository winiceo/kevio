import cors from 'cors';

export default function(app) {

    const _log   = app.lib.logger;
    const _group = 'BOOT:CORS';

    try {
        app.use(cors());
        app.options('*', cors());
        return true;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};





