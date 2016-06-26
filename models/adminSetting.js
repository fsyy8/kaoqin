var mongodb = require("./index");
var Schema = mongodb.mongoose.Schema;

//管理员设置
var adminSettingSchema = new Schema({
    kaoqinTotal: {type: Number},
});
var adminSettingModel = mongodb.mongoose.model("adminsetting", adminSettingSchema);
exports.adminSettingList = adminSettingModel;
