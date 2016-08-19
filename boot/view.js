import moment from 'moment';
import momentTz from 'moment-timezone';
import path from 'path';
import swig from 'swig';
import extras from 'swig-extras';
import _s from 'underscore.string';
import _ from 'lodash';

// swig extra filters
extras.useFilter(swig, 'split');

/**
 * @TODO
 * buradaki fonksiyonları düzenle
 */

// use lodash
function useLodash(swig, filter, string) {
    const obj = string ? _s : _;
    
    if (filter === undefined) {
        return Object.keys(obj).forEach(action => {
            if (lodashHas(action, string))
                useLodash(swig, action, string)
        })
    }

    if (Array.isArray(filter)) {
        return filter.forEach(f => {
            useLodash(swig, f, string)
        })
    }

    if (lodashHas(filter, string))
        swig.setFilter((string?'s_':'')+filter, obj[filter])
    else
        throw new Error(filter+' is not a lodash function');
}

function lodashHas(functionName, string) {
    const obj = string ? _s : _;
    return (obj[functionName] && typeof obj[functionName] === 'function')
}

useLodash(swig);
useLodash(swig, undefined, true);

swig.setFilter('dateFormat', (element, format, timezone, locale) => {
    if(locale)
        moment.locale(locale);
    
    let parsed;
    if(format == 'fromNow') {
        parsed = moment(element).fromNow();
    }
    else {
        if(timezone && timezone != '')
            parsed = momentTz.tz(new Date(element), timezone).format(format);
        else
            parsed = moment(new Date(element)).format(format);        
    }
    
    if(parsed == 'Invalid date')
        return element;
    
    return parsed;
});

swig.setFilter('trToUpper', string => string.trToUpper());

swig.setFilter('numberFormat', (number, decimals, decimalSeparator, orderSeparator) => {
    number = parseInt(number);
    decimals = decimals || 0;
    decimalSeparator = decimalSeparator || '.';
    orderSeparator = orderSeparator || ',';
    
    return _s.numberFormat(number, decimals, decimalSeparator, orderSeparator);
});

export default function(app) {

    const _log   = app.lib.logger;
    const _group = 'BOOT:VIEW';

    try {
        // get config
        const _env  = app.get('env');
        const _conf = app.lib.bootConf(app, 'view');
        const _dir  = path.dirname(__dirname);

        // view
        app.engine('html', swig.renderFile);
        app.set('view engine', 'html');

        // set both app view and app.io folders
        app.set('views', [
            app.get('basedir')+'/'+(_conf.dir || 'view'),
            _dir+'/'+(_conf.dir || 'view')
        ]);

        app.set('view cache', _env == 'production');
        swig.setDefaults(_conf.swig || {});

        return true;
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};



