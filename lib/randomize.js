import async from 'async';
import _ from 'underscore';

class Randomize {
    constructor(mongoose) {
        this._mongoose = mongoose;
        this._models   = {};
        return this;
    }

    sync(model, kue) {
        const self = this;

        // update model
        const m = self._mongoose.model(model);
        const stream = m.find({}).stream({transform: transform});

        stream.on('data', doc => {

            kue.create('randomize-document', {
                title: 'Randomize document',
                params: {
                    type  : 'randomize-document',
                    model : model,
                    id    : doc._id.toString()
                }
            }).attempts(3).removeOnComplete(true).save();

        }).on('error', err => {
            console.error(err.stack);
        }).on('end', () => {
            console.log(model+' randomize sync stream end');
        });

        return stream;
    }
}

function transform(doc) {
    return doc;
}

export default function(app) {
    return new Randomize(app.core.mongo.mongoose);
};

