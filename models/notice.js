var mongodb = require("./index");
var Schema = mongodb.mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

//公告Schema
var noticeSchema = new Schema({
    noticeTitle: {type: String},
    noticeInfo: {type: String},
    noticeText: {type: String},
    publishedBy: {type: ObjectId, ref:'bloguser'},
    recommended: {type: Boolean, default:false},
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
var noticeModel = mongodb.mongoose.model("notice", noticeSchema);
exports.noticeList = noticeModel;

//评论Schema
var noticeCommentSchema = new Schema({
    notice: {type: ObjectId, ref: 'notice'},
    from: {type: ObjectId, ref: 'bloguser'},
    reply: [{
    	from:{type: ObjectId, ref:'bloguser'},
    	to:{type:ObjectId, ref:'bloguser'},
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

var noticeCommentModel = mongodb.mongoose.model("noticecomment", noticeCommentSchema);
exports.noticeCommentList = noticeCommentModel;