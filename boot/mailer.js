import mailer from 'nodemailer';
import _ from 'underscore';

export default function(app) {

    const _log   = app.lib.logger;
    const _group = 'BOOT:MAILER';

    try {
        const _conf = app.lib.bootConf(app, 'mailer');

        if( ! _conf )
            return false;

        // birden fazla config varsa hepsi için client oluşturuyoruz
        if( ! _conf.service ) {
            const obj = {};
            _.each(_conf, (val, key) => {
                obj[key] = mailer.createTransport(val);
            });

            return obj;
        }
        
        return mailer.createTransport(_conf);
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};





