var mongodb = require("./index");

/*
* 用户注册
* */

var Schema = mongodb.mongoose.Schema;

//注册
var registerSchema = new Schema({
    username: {type: String},
    password: {type: String},
    pingshiScore: [{type: Number},{type: Number},{type: Number},{type: Number},{type: Number}],
    qimoScore: {type: Number},
    nickname: {type: String},
    kaoqin: {type: Number},
    kaoqinTotal: {type: Number},
    createTime: {type: Date, default: Date.new}
});
var userModel = mongodb.mongoose.model("bloguser", registerSchema);
exports.userList = userModel;
