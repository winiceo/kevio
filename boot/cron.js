import {CronJob} from 'cron';

export default function(app) {

    const _log   = app.lib.logger;
    const _group = 'BOOT:CRON';

    try {
        return CronJob;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};




