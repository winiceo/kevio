import stampede from 'cache-stampede';

export default function(app) {
    return stampede.redis(app.core.redis.a);
};