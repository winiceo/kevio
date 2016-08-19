import extend from 'extend';
import dot from 'dotty';

function Time() {
    return this;
}

Time.prototype.minute   = 60;
Time.prototype.minuteMs = 60*1000;
Time.prototype.hour     = 60*60;
Time.prototype.hourMs   = 60*60*1000;
Time.prototype.day      = 24*60*60;
Time.prototype.dayMs    = 24*60*60*1000;

export default function(app) {
    return new Time();
};
