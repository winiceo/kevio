function Limiter(req, res, next) {

    /**
     * @TODO
     * api rate limiter middleware
     */

    next();

}

export default function(app) {
    return Limiter;
};