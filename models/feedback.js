var mongodb = require("./index");
var Schema = mongodb.mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

//反馈Schema
var feedbackSchema = new Schema({
    feedbackText: {type: String},
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});
var feedbackModel = mongodb.mongoose.model("feedback", feedbackSchema);
exports.feedbackList = feedbackModel;