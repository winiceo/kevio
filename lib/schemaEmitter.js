import {EventEmitter} from 'events';

export default function(app) {

    const Emitter = new EventEmitter();

    // set max listeners
    Emitter.setMaxListeners(0);

    return Emitter;

};