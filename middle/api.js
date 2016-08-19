function Api(req, res, next) {
    res.__api = true;
    next();
}

export default function(app) {
    return Api;
};