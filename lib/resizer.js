import fs from 'fs';
import gm from 'gm';

class Resizer {
    resize(options, cb) {
        options = options || {};

        gm(options.path)
            .resize(options.width, options.height, '!')
            .quality(options.quality || 80)
            .write(options.target, err => {
                cb(err);
            });
    }

    square(options, cb) {
        options = options || {};

        gm(options.path)
            .resize(options.width, options.height, '^')
            .quality(options.quality || 80)
            .gravity('Center')
            .extent(options.width, options.height)
            .write(options.target, err => {
                cb(err);
            });
    }

    crop(options, cb) {
        options = options || {};

        gm(options.path)
            .crop(options.width, options.height)
            .quality(options.quality || 80)
            .write(options.target, err => {
                cb(err);
            });
    }

    thumbnail(options, cb) {
        options = options || {};

        gm(options.path)
            .thumbnail(options.width, options.height)
            .quality(options.quality || 80)
            .write(options.target, err => {
                cb(err);
            });
    }
}

export default function(app) {
    return new Resizer();
};
