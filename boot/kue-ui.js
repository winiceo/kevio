import kue from 'kue';

export default function(app) {

    const _env   = app.get('env');
    const _log   = app.lib.logger;
    const _group = 'BOOT:KUE_UI';

    try {
        // mount ui
        app.use('/admin/kue', kue.app);
        return true;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};







