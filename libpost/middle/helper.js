import dot from 'dotty';

function LibpostMiddleHelper(app) {
    this._app = app;
    this._env = app.get('env');
    this._log = app.lib.logger;

    return this;
}

export default function(app) {
    return new LibpostMiddleHelper(app);
};
