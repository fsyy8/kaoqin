exports.session = function (req, res, next){
    res.locals.user = req.session.user;
    var err = req.session.error;
    res.locals.message = "";
    if(err){
        res.locals.message = "<div style=\"margin-bottom: 20px; color: #f00;\">"+err+"</div>"
    }
    next();
};