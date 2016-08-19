function Json(req, res, next) {
    res.__json = true;
    next();
}

export default function(app) {
    return Json;
};