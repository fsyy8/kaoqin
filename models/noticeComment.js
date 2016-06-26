var mongodb = require("./index");
var Schema = mongodb.mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var noticeCommentSchema = new Schema({
    notice: {type: ObjectId, ref: 'notice'},
    from: {type: ObjectId, ref: 'bloguser'},
    reply: [{
    	from:{type: ObjectId, ref:'User'},
    	to:{type:ObjectId, ref:'User'},
    	content: String
    }],
    content: {type: String},
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

var noticeCommentModel = mongodb.mongoose.model("notice", noticeCommentSchema);
exports.noticeCommentList = noticeCommentModel;
