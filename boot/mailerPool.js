import mailer from 'nodemailer';
import pool from 'nodemailer-smtp-pool';
import _ from 'underscore';

export default function(app) {

    const _log   = app.lib.logger;
    const _group = 'BOOT:MAILERPOOL';

    try {
        const _conf = app.lib.bootConf(app, 'mailer');

        if( ! _conf )
            return false;

        // birden fazla config varsa hepsi için client oluşturuyoruz
        if( ! _conf.service ) {
            const obj = {};
            _.each(_conf, (val, key) => {
                obj[key] = mailer.createTransport(pool(val));
            });

            return obj;
        }
        
        return mailer.createTransport(pool(_conf));
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};





