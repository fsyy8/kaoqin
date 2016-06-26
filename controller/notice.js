var userModel = require("../models/login").userList;
var noticeModel = require("../models/notice").noticeList;
var noticeCommentModel = require("../models/notice").noticeCommentList;

exports.addNotice = function(req,res){
    var newNotice = new noticeModel({
        noticeTitle:req.body.noticeTitle,
        noticeInfo: req.body.noticeInfo,
        noticeText: req.body.noticeText,
        publishedBy:req.session.user.userid,
    });
    newNotice.save(function (err){
        if(!err){
            res.send({
                code: 200,
                msg: "增加成功！（本条消息来自后台）"
            });
        }
    });
};

exports.getNotice = function(callback){
	noticeModel
        .find()
        .populate('publishedBy','nickname')
        .exec(
            function (err, result) {
    		var posts = [];
    		if(!err){
                posts = result;
            }
            callback(posts);
    	})
};

exports.getDetail = function(req,res,callback){
	var id = req.params.id;
    noticeModel.findById(id, function (err, doc){
        var notice;
        if (!err) {
            notice = doc;
            noticeCommentModel
                .find({notice : id})
                .populate('from','nickname')
                .exec(function(err,doc){
                    var comments = [];
                    if(!err) {
                        comments = doc;
                    }
                    callback(notice,comments);
                })
        }
    });
};

exports.getComments = function(req,res,callback){
    
};

exports.addNoticeComment = function(req,res){
    var newComment = new noticeCommentModel({
        notice: req.body.notice,
        from: req.session.user.userid,
        content: req.body.content,
    });
    newComment.save(function (err){
        if(!err){
            res.send({
                code: 200,
                msg: "增加成功！（本条消息来自后台）"
            });
        }
    });
}
