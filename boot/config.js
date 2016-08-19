import morgan from 'morgan';

export default function(app) {

    const _log   = app.lib.logger;
    const _group = 'BOOT:CONFIG';

    try {
        const _env  = app.get('env');

        const _skip = (req, res) => req.baseUrl == '/admin/kue';

        switch(_env) {
            case 'development':
                app.use(morgan('dev', {skip: _skip}));
                break;

            case 'testing':
                app.use(morgan('short', {skip: _skip}));
                break;

            case 'production':
                app.use(morgan('short', {skip: _skip}));
                break;

            default:
        }

        return true;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};




