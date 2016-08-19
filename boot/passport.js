import passport from 'passport';

export default function(app) {

    const _log   = app.lib.logger;
    const _group = 'BOOT:PASSPORT';

    try {
        app.use(passport.initialize());
        app.use(passport.session());

        passport.serializeUser((user, done) => {
            done(null, user);
        });

        passport.deserializeUser((user, done) => {
            done(null, user);
        });

        return true;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};




