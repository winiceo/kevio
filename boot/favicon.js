import favicon from 'serve-favicon';

export default function(app) {

    const _log   = app.lib.logger;
    const _group = 'BOOT:FAVICON';

    try {
        let fileName = 'favicon.ico';
        const _conf    = app.lib.bootConf(app, 'favicon');
        
        if(_conf && _conf.fileName)
            fileName = _conf.fileName;
        
        app.use(favicon(app.get('basedir')+'/public/'+fileName));
        return true;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};




