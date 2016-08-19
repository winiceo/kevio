import kue from 'kue';
import dot from 'dotty';

export default function(app) {

    const _env   = app.get('env');
    const _log   = app.lib.logger;
    const _conf  = app.config[_env].redis || dot.get(app.config[_env], 'data.redis');
    const _group = 'BOOT:KUE';

    try {
        const redisObj = {
            port: _conf.port,
            host: _conf.host
        };

        if(_conf.pass)
            redisObj.auth = _conf.pass;

        const queue = kue.createQueue({
            prefix: 'q',
            redis: redisObj,
            disableSearch: true,
            jobEvents: false
        });

        queue.watchStuckJobs(_conf.stuckInterval || 5000);
        
        return queue;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};




