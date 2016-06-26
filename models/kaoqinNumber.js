var mongodb = require("./index");
var Schema = mongodb.mongoose.Schema;

var kaoqinNumberSchema = new Schema({
    kaoqinNumber: {type: Number},
    usedOrNot: {type: Boolean},
    NumberClass: {type: Number},
});

var kaoqinNumberModel = mongodb.mongoose.model("kaoqinNumber", kaoqinNumberSchema);

exports.kaoqinNumberList = kaoqinNumberModel;