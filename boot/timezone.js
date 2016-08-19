import moment from 'moment-timezone';

export default function(app) {

    const _log   = app.lib.logger;
    const _mdl   = app.middle;
    const _group = 'BOOT:TIMEZONE';

    try {
        const _conf = app.lib.bootConf(app, 'timezone');
        
        app.all('*', (req, res, next) => {
            if( req.session && ! req.session.time && _conf && _conf.default )
                req.session.time = {name: _conf.default};

            req.__time = false;
            
            if(req.session.time) {
                const currTz = moment.tz(req.session.time.name);
                const hours  = currTz.format('Z');
                const mins   = currTz.utcOffset();
                
                req.session.time.hours = hours;
                req.session.time.mins  = mins;
                        
                req.__time = {
                    name  : req.session.time.name,
                    hours : hours,
                    mins  : mins
                }                
            }
            
            next();
        });

        return true;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};




