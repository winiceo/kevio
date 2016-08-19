import _ from 'underscore';

// speed up calls
const toString = Object.prototype.toString;

class System {
    constructor(app) {
        this._app = app;
    }

    hash(passwd, salt) {

    }
}

export default function(app) {
    return new System(app);
};
