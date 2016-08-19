export default function(app) {

    /**
     * @TODO
     * routing config'e çekilebilir
     */

    const _log   = app.lib.logger;
    const _mdl   = app.middle;
    const _group = 'BOOT:ADMIN:REDIRECT';

    try {
        app.all('/admin*',
            _mdl.basic,
        (req, res, next) => {
            const segment = res.locals.segments[2];
            const routes  = ['login', 'logout'];

            if( ! req.session.adminUserId && routes.indexOf(segment) == -1)
                return res.redirect('/admin/login');

            next();
        });

        return true;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};




