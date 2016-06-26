var userList = {};

exports.getLogin = function (req, res){
    res.send({
        code:200,
        msg: "登录成功（本条消息来自后台）"
    });
    userList = {
        username: req.param("username")
    }
};

exports.userList = function (){
    return userList;
};